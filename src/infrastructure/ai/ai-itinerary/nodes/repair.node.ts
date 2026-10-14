import { IAIModelService } from '../../../../application/interfaces/services/ai-model.service.interface';
import { ItineraryGraphState } from '../itinerary.states';

export async function repairResponseNode(
  state: ItineraryGraphState,
  aiModel: IAIModelService,
) {
  const prompt = `
The following itinerary failed JSON parsing or validation.

Errors:
${state.validationErrors.join('\n')}

Original response:

${state.rawAiResponse}

INSTRUCTIONS:
- You must output the COMPLETE itinerary from start to finish as valid JSON.
- DO NOT use ellipses (...) or placeholders.
- DO NOT omit any days or activities.
- Output ONLY the raw JSON object, without markdown blocks or explanations.
`;

  const response = await aiModel.complete({
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    options: {
      temperature: 0.2,
      maxTokens: 6000,
      responseFormat: 'json',
    },
  });

  return {
    rawAiResponse: response.text,
    repairAttempts: state.repairAttempts + 1,
  };
}
