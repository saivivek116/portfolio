// API service functions for interview data
import { v4 as uuidv4 } from 'uuid';

export type Answer = {
  id: string | number;
  title: string;
  body: string;
};

export type Question = {
  id: string | number;
  question: string;
  answers: Answer[];
};

// Fetch all questions
export async function fetchQuestions(): Promise<Question[]> {
  try {
    const response = await fetch('/api/interview');
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.questions || [];
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw error;
  }
}

// Fetch a specific question
export async function fetchQuestion(id: string | number): Promise<Question> {
  try {
    const response = await fetch(`/api/interview/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch question ${id}:`, error);
    throw error;
  }
}

// Create a new question
export async function createQuestion(questionText: string, firstAnswer: { title: string, body: string }): Promise<Question> {
  try {
    // Generate a unique ID
    const id = uuidv4();
    
    // Prepare the first answer with its own ID
    const answerId = `${id}_answer_1`;
    const answer = { ...firstAnswer, id: answerId };
    
    const payload = {
      id,
      question: questionText,
      answers: [answer]
    };
    
    const response = await fetch('/api/interview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    // Return the created question with its ID
    return { ...payload };
  } catch (error) {
    console.error('Failed to create question:', error);
    throw error;
  }
}

// Update a question
export async function updateQuestion(question: Question): Promise<Question> {
  try {
    const { id } = question;
    
    const response = await fetch(`/api/interview/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    // Return the updated question
    return question;
  } catch (error) {
    console.error(`Failed to update question ${question.id}:`, error);
    throw error;
  }
}

// Delete a question
export async function deleteQuestion(id: string | number): Promise<boolean> {
  try {
    const response = await fetch(`/api/interview/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Failed to delete question ${id}:`, error);
    throw error;
  }
}

// Add a new answer to a question
export async function addAnswer(questionId: string | number, answer: { title: string, body: string }): Promise<Question> {
  try {
    // First get the current question
    const question = await fetchQuestion(questionId);
    
    // Generate a unique ID for the new answer
    const answerId = `${questionId}_answer_${question.answers.length + 1}`;
    const newAnswer = { ...answer, id: answerId };
    
    // Add the new answer to the question
    const updatedQuestion = {
      ...question,
      answers: [...question.answers, newAnswer]
    };
    
    // Update the question
    return await updateQuestion(updatedQuestion);
  } catch (error) {
    console.error(`Failed to add answer to question ${questionId}:`, error);
    throw error;
  }
}

// Update an existing answer
export async function updateAnswer(
  questionId: string | number, 
  answerId: string | number, 
  updatedAnswer: { title: string, body: string }
): Promise<Question> {
  try {
    // First get the current question
    const question = await fetchQuestion(questionId);
    
    // Find and update the specific answer
    const updatedAnswers = question.answers.map(answer => 
      answer.id === answerId ? { ...answer, ...updatedAnswer } : answer
    );
    
    // Update the question with modified answers
    const updatedQuestion = {
      ...question,
      answers: updatedAnswers
    };
    
    // Update the question
    return await updateQuestion(updatedQuestion);
  } catch (error) {
    console.error(`Failed to update answer ${answerId} for question ${questionId}:`, error);
    throw error;
  }
}

// Delete an answer from a question
export async function deleteAnswer(questionId: string | number, answerId: string | number): Promise<Question> {
  try {
    // First get the current question
    const question = await fetchQuestion(questionId);
    
    // Verify we're not trying to delete the last answer
    if (question.answers.length <= 1) {
      throw new Error("Cannot delete the last answer. A question must have at least one answer.");
    }
    
    // Filter out the answer to be deleted
    const updatedAnswers = question.answers.filter(answer => answer.id !== answerId);
    
    // Update the question with the remaining answers
    const updatedQuestion = {
      ...question,
      answers: updatedAnswers
    };
    
    // Update the question
    return await updateQuestion(updatedQuestion);
  } catch (error) {
    console.error(`Failed to delete answer ${answerId} from question ${questionId}:`, error);
    throw error;
  }
}