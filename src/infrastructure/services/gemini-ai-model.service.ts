import { injectable } from "tsyringe";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AICompletionOptions, AICompletionRequest, AICompletionResponse, IAIModelService } from "../../application/interfaces/services/ai-model.service.interface";

@injectable()
export class GeminiAIModelService implements IAIModelService {
  private _client: GoogleGenerativeAI | null = null;
  private readonly _fallbackModel = "gemini-flash-lite-latest";

  private get client(): GoogleGenerativeAI {
    if (!this._client) {
      const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured. Please add GEMINI_API_KEY to your .env file.");
      }
      this._client = new GoogleGenerativeAI(apiKey);
    }
    return this._client;
  }

  private async executeModel(modelName: string, systemPrompt?: string, userPrompt: string = "", options?: AICompletionOptions) {
    const cleanModel = modelName.trim().replace(/^models\//, "");
    const model = this.client.getGenerativeModel({
      model: cleanModel,
      systemInstruction: systemPrompt,
      generationConfig: {
        temperature: options?.temperature ?? 0.3,
        maxOutputTokens: options?.maxTokens ?? 8192,
        responseMimeType: options?.responseFormat === "json" ? "application/json" : undefined,
      },
    });

    const result = await model.generateContent(userPrompt);
    const response = result.response;
    return { response, modelName: cleanModel };
  }

  async complete(request: AICompletionRequest): Promise<AICompletionResponse> {
    const systemPrompt = request.messages.find((m) => m.role === "system")?.content;
    const userPrompt = request.messages.find((m) => m.role === "user")?.content || "";
    const primaryModel = request.model || process.env.GEMINI_MODEL || "gemini-3.8-flash";

    let result;
    try {
      result = await this.executeModel(primaryModel, systemPrompt, userPrompt, request.options);
    } catch (error: any) {
      // If primary model is temporarily unavailable (503 Demand Spike, 404 Deprecated/Not Found, 429 Rate Limit)
      const isUnavailable = error?.status === 503 || error?.status === 404 || error?.status === 429;

      if (isUnavailable && primaryModel !== this._fallbackModel) {
        console.warn(`[GeminiAIModelService] ${primaryModel} unavailable (${error.status}: ${error.statusText || error.message}). Falling back to ${this._fallbackModel}...`);
        result = await this.executeModel(this._fallbackModel, systemPrompt, userPrompt, request.options);
      } else {
        console.error("[GeminiAIModelService] Error:", error);
        throw error;
      }
    }

    const text = result.response.text();
    const usage = result.response.usageMetadata;

    return {
      text,
      model: result.modelName,
      usage: usage
        ? {
            promptTokens: usage.promptTokenCount ?? 0,
            completionTokens: usage.candidatesTokenCount ?? 0,
            totalTokens: usage.totalTokenCount ?? 0,
          }
        : undefined,
    };
  }
}
