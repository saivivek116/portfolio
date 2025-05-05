"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  fetchQuestions, 
  createQuestion, 
  updateQuestion, 
  deleteQuestion, 
  addAnswer, 
  updateAnswer, 
  deleteAnswer 
} from './services';

// Answer Modal Component using React Portal
const AnswerModal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;
    
    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                    {content}
                </div>
            </div>
        </div>,
        document.body
    );
};

// Form Modal Component for adding/editing questions and answers
const FormModal = ({ isOpen, onClose, onSubmit, title, formType, initialData = null, questionId = null }) => {
    const [formData, setFormData] = useState({
        question: '',
        title: '',
        body: '',
    });
    
    const [errors, setErrors] = useState({
        question: '',
        title: '',
        body: '',
    });
    
    useEffect(() => {
        if (isOpen) {
            // Initialize form with data if editing
            if (initialData) {
                setFormData({
                    question: initialData.question || '',
                    title: initialData.title || '',
                    body: initialData.body || '',
                });
            } else {
                // Reset form data when modal opens for new items
                setFormData({
                    question: '',
                    title: '',
                    body: '',
                });
            }
            
            setErrors({
                question: '',
                title: '',
                body: '',
            });
        }
    }, [isOpen, initialData]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    
    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };
        
        if (formType === 'question' && !formData.question.trim()) {
            newErrors.question = 'Question is required';
            isValid = false;
        }
        
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        }
        
        if (!formData.body.trim()) {
            newErrors.body = 'Body content is required';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData, questionId, initialData?.id);
            onClose();
        }
    };
    
    if (!isOpen) return null;
    
    const isEditing = initialData !== null;
    const submitButtonText = isEditing 
        ? (formType === 'question' ? 'Update Question' : 'Update Answer')
        : (formType === 'question' ? 'Add Question' : 'Add Answer');
    
    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formType === 'question' && (
                        <div>
                            <label htmlFor="question" className="block text-sm font-medium mb-1">
                                Question
                            </label>
                            <input
                                type="text"
                                id="question"
                                name="question"
                                value={formData.question}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors.question ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                } dark:bg-gray-700 dark:border-gray-600`}
                                placeholder="Enter your question"
                            />
                            {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question}</p>}
                        </div>
                    )}
                    
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">
                            {formType === 'question' ? (isEditing ? 'First Answer Title' : 'First Answer Title') : 'Answer Title'}
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.title ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                            } dark:bg-gray-700 dark:border-gray-600`}
                            placeholder="Enter a title for your answer"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="body" className="block text-sm font-medium mb-1">
                            {formType === 'question' ? (isEditing ? 'First Answer Content' : 'First Answer Content') : 'Answer Content'}
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            rows={5}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.body ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                            } dark:bg-gray-700 dark:border-gray-600`}
                            placeholder="Enter the detailed answer"
                        ></textarea>
                        {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
                    </div>
                    
                    <div className="flex justify-end pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md mr-2 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {submitButtonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

// Confirmation Modal Component for delete operations
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
    
    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{message}</p>
                </div>
                
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

// Loading spinner component
const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
};

// The main interview page component
const InterviewPage = () => {
    const [interviewData, setInterviewData] = useState([]);
    const [expandedQuestionId, setExpandedQuestionId] = useState(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [formModalType, setFormModalType] = useState('question'); // 'question' or 'answer'
    const [formModalMode, setFormModalMode] = useState('add'); // 'add' or 'edit'
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load questions from Redis on component mount
    useEffect(() => {
        setMounted(true);
        
        const loadQuestions = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const questions = await fetchQuestions();
                setInterviewData(questions);
                
                // Set the first question to be expanded by default if we have questions
                if (questions.length > 0) {
                    setExpandedQuestionId(questions[0].id);
                }
            } catch (err) {
                console.error('Error loading questions:', err);
                setError('Failed to load questions. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        
        loadQuestions();
    }, []);

    // Toggle question expansion
    const toggleQuestion = (id) => {
        setExpandedQuestionId(prevId => prevId === id ? null : id);
    };

    // Open modal to view an answer
    const openAnswerModal = (answer, event) => {
        // Prevent action buttons from triggering the modal
        if (event && (event.target.closest('.edit-btn') || event.target.closest('.delete-btn'))) {
            return;
        }
        setSelectedAnswer(answer);
        setViewModalOpen(true);
    };

    // Open modal to add a new question
    const openAddQuestionModal = () => {
        setFormModalType('question');
        setFormModalMode('add');
        setFormModalOpen(true);
        setSelectedAnswer(null);
    };

    // Open modal to add a new answer to a question
    const openAddAnswerModal = (questionId) => {
        setFormModalType('answer');
        setFormModalMode('add');
        setSelectedQuestionId(questionId);
        setSelectedAnswer(null);
        setFormModalOpen(true);
    };

    // Open modal to edit a question
    const openEditQuestionModal = (question) => {
        setFormModalType('question');
        setFormModalMode('edit');
        
        // When editing a question, we keep the first answer data too
        const firstAnswer = question.answers[0] || { title: '', body: '' };
        setSelectedAnswer({
            id: question.id,
            question: question.question,
            title: firstAnswer.title,
            body: firstAnswer.body,
            answerId: firstAnswer.id
        });
        
        setSelectedQuestionId(question.id);
        setFormModalOpen(true);
    };

    // Open modal to edit an answer
    const openEditAnswerModal = (answer, questionId) => {
        setFormModalType('answer');
        setFormModalMode('edit');
        setSelectedAnswer(answer);
        setSelectedQuestionId(questionId);
        setFormModalOpen(true);
    };

    // Open confirmation modal for deletion
    const openDeleteConfirmation = (type, item, questionId = null) => {
        setItemToDelete({ type, item, questionId });
        setConfirmModalOpen(true);
    };

    // Close view modal
    const closeViewModal = () => {
        setViewModalOpen(false);
    };

    // Close form modal
    const closeFormModal = () => {
        setFormModalOpen(false);
    };

    // Close confirmation modal
    const closeConfirmModal = () => {
        setConfirmModalOpen(false);
        setItemToDelete(null);
    };

    // Handle form submission for adding or editing questions and answers
    const handleFormSubmit = async (formData, questionId = null, itemId = null) => {
        try {
            setError(null);
            
            if (formModalType === 'question') {
                if (formModalMode === 'add') {
                    // Add new question with first answer
                    const newQuestion = await createQuestion(
                        formData.question, 
                        { title: formData.title, body: formData.body }
                    );
                    
                    setInterviewData(prev => [...prev, newQuestion]);
                    setExpandedQuestionId(newQuestion.id);
                } else {
                    // Edit existing question
                    // Get the current question
                    const question = interviewData.find(q => q.id === questionId);
                    
                    // Update the question text
                    const updatedQuestion = { 
                        ...question, 
                        question: formData.question 
                    };
                    
                    // If updating first answer as well
                    if (selectedAnswer?.answerId) {
                        const firstAnswerIndex = updatedQuestion.answers.findIndex(a => a.id === selectedAnswer.answerId);
                        if (firstAnswerIndex !== -1) {
                            updatedQuestion.answers[firstAnswerIndex] = {
                                ...updatedQuestion.answers[firstAnswerIndex],
                                title: formData.title,
                                body: formData.body
                            };
                        }
                    }
                    
                    // Update in Redis
                    await updateQuestion(updatedQuestion);
                    
                    // Update local state
                    setInterviewData(prev => 
                        prev.map(q => q.id === questionId ? updatedQuestion : q)
                    );
                }
            } else {
                // Handle answer operations
                if (formModalMode === 'add') {
                    // Add new answer
                    const updatedQuestion = await addAnswer(
                        questionId, 
                        { title: formData.title, body: formData.body }
                    );
                    
                    // Update local state
                    setInterviewData(prev => 
                        prev.map(q => q.id === questionId ? updatedQuestion : q)
                    );
                } else {
                    // Edit existing answer
                    const updatedQuestion = await updateAnswer(
                        questionId, 
                        itemId, 
                        { title: formData.title, body: formData.body }
                    );
                    
                    // Update local state
                    setInterviewData(prev => 
                        prev.map(q => q.id === questionId ? updatedQuestion : q)
                    );
                }
            }
        } catch (err) {
            console.error('Error handling form submission:', err);
            setError(err.message || 'An error occurred while saving. Please try again.');
            alert(err.message || 'An error occurred while saving. Please try again.');
        }
    };

    // Handle deletion of questions or answers
    const handleDelete = async () => {
        if (!itemToDelete) return;
        
        const { type, item, questionId } = itemToDelete;
        
        try {
            setError(null);
            
            if (type === 'question') {
                // Delete question
                await deleteQuestion(item.id);
                
                // Update local state
                setInterviewData(prev => prev.filter(q => q.id !== item.id));
                
                // If the deleted question was expanded, collapse it
                if (expandedQuestionId === item.id) {
                    setExpandedQuestionId(null);
                }
            } else {
                // Delete answer
                try {
                    const updatedQuestion = await deleteAnswer(questionId, item.id);
                    
                    // Update local state
                    setInterviewData(prev => 
                        prev.map(q => q.id === questionId ? updatedQuestion : q)
                    );
                } catch (err) {
                    // Check if this is the "cannot delete last answer" error
                    if (err.message.includes('last answer')) {
                        alert("Cannot delete the last answer. A question must have at least one answer.");
                    } else {
                        throw err;
                    }
                }
            }
        } catch (err) {
            console.error('Error handling deletion:', err);
            setError(err.message || 'An error occurred during deletion. Please try again.');
            alert(err.message || 'An error occurred during deletion. Please try again.');
        } finally {
            closeConfirmModal();
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Interview Questions & Answers</h1>
                <button
                    onClick={openAddQuestionModal}
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Add New Question
                </button>
            </div>
            
            {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                    <p>{error}</p>
                </div>
            )}
            
            {isLoading ? (
                <LoadingSpinner />
            ) : interviewData.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No questions have been added yet.</p>
                    <button
                        onClick={openAddQuestionModal}
                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Add Your First Question
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {interviewData.map((item) => (
                        <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <button
                                    onClick={() => toggleQuestion(item.id)}
                                    className="flex-1 text-left px-6 py-4 flex items-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 mr-2 transform transition-transform ${expandedQuestionId === item.id ? 'rotate-90' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    <h2 className="text-xl font-semibold">{item.question}</h2>
                                </button>
                                <div className="flex items-center px-4">
                                    <button 
                                        onClick={() => openEditQuestionModal(item)}
                                        className="edit-btn text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-2 mr-1"
                                        aria-label="Edit question"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => openDeleteConfirmation('question', item)}
                                        className="delete-btn text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2"
                                        aria-label="Delete question"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            {expandedQuestionId === item.id && (
                                <div className="px-6 py-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-lg font-medium">Available Answers:</h3>
                                        <button
                                            onClick={() => openAddAnswerModal(item.id)}
                                            className="px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                                        >
                                            Add Answer
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
                                        {item.answers.map((answer) => (
                                            <div 
                                                key={answer.id}
                                                onClick={(e) => openAnswerModal(answer, e)}
                                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition flex flex-col relative"
                                            >
                                                <h4 className="font-medium mb-2 pr-16">{answer.title}</h4>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-2">
                                                    {answer.body.substring(0, 80)}
                                                    {answer.body.length > 80 ? '...' : ''}
                                                </p>
                                                <p className="text-blue-600 dark:text-blue-400 text-xs mt-auto">
                                                    Click to view full answer
                                                </p>
                                                <div className="absolute top-2 right-2 flex">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openEditAnswerModal(answer, item.id);
                                                        }}
                                                        className="edit-btn text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                                                        aria-label="Edit answer"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openDeleteConfirmation('answer', answer, item.id);
                                                        }}
                                                        className="delete-btn text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                                                        aria-label="Delete answer"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            
            {mounted && (
                <>
                    <AnswerModal
                        isOpen={viewModalOpen}
                        onClose={closeViewModal}
                        title={selectedAnswer?.title || ''}
                        content={selectedAnswer?.body || ''}
                    />
                    <FormModal
                        isOpen={formModalOpen}
                        onClose={closeFormModal}
                        onSubmit={handleFormSubmit}
                        title={
                            formModalMode === 'edit' 
                                ? (formModalType === 'question' ? 'Edit Question' : 'Edit Answer') 
                                : (formModalType === 'question' ? 'Add New Question' : 'Add New Answer')
                        }
                        formType={formModalType}
                        initialData={selectedAnswer}
                        questionId={selectedQuestionId}
                    />
                    <ConfirmationModal
                        isOpen={confirmModalOpen}
                        onClose={closeConfirmModal}
                        onConfirm={handleDelete}
                        title={
                            itemToDelete?.type === 'question' 
                                ? 'Delete Question' 
                                : 'Delete Answer'
                        }
                        message={
                            itemToDelete?.type === 'question'
                                ? 'Are you sure you want to delete this question and all its answers? This action cannot be undone.'
                                : 'Are you sure you want to delete this answer? This action cannot be undone.'
                        }
                    />
                </>
            )}
        </div>
    );
};

export default InterviewPage;