/ *Build prompt for meeting summary */

export const buildSummaryPrompt = (meetingNotes) => `
You are an AI meeting assistant.

Generate a concise and professional meeting summary.

Meeting Notes:
${meetingNotes}

Instructions:
- Keep the summary under 150 words.
- Use professional language.
- Focus on the overall discussion and outcome.
`;

/**
 * Build prompt for key points
 */
export const buildKeyPointsPrompt = (meetingNotes) => `
You are an AI meeting assistant.

Extract the key discussion points from the meeting.

Meeting Notes:
${meetingNotes}

Instructions:
- Return only bullet points.
- Include the most important discussion topics.
- Avoid unnecessary explanations.
`;

/**
 * Build prompt for action items
 */
export const buildActionItemsPrompt = (meetingNotes) => `
You are an AI meeting assistant.

Extract all action items from the meeting.

Meeting Notes:
${meetingNotes}

Instructions:
For each action item include:

- Task
- Assigned Person (if mentioned)
- Deadline (if mentioned)

Return the response as bullet points.
`;  

/**
 * Build prompt for follow-up email
 */
export const buildFollowUpEmailPrompt = (meetingNotes) => `
You are an AI meeting assistant.

Write a professional follow-up email based on the meeting.

Meeting Notes:
${meetingNotes}

The email should include:

- Greeting
- Short meeting summary
- Action items
- Professional closing

Keep the tone formal and concise.
`;

