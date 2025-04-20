'use client';
import React, { useEffect, useState } from 'react';
import ClipsList from './components/ClipList';

// Placeholder data - replace with actual data fetching
// const initialClips = [
//   'This is the first clip content.',
//   'https://example.com',
//   'Another piece of text to be copied.',
//   'http://anothersite.org/path?query=value',
//   'Lorem ipsum dolor sit amet.',
// ];



export default function CopyClipPage() {
    const [clips, setClips] = useState([]); // Replace with actual state management
    const [newClip, setNewClip] = useState('');

    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        async function fetchCopyClips(){
            try{
                setLoading(true);
                const response = await fetch('/api/copyclip', {
                    method:"GET",
                });
                if(!response.ok){
                    throw new Error("Trouble fetching clips");
                }
                const {records} = await response.json();
                setClips(records);
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false);
            }
        }
        fetchCopyClips();
    }, []);

    const handleAddClip = async (e) => {
        e.preventDefault();
        const content = newClip.trim();
        if (!content) return;
        
        setNewClip('');
        const clipId = crypto.randomUUID(); 
        const new_clip_obj = {id: `${clipId}`, content }
        setClips([...clips, new_clip_obj]);
        try{
            const response = await fetch("/api/copyclip",{
                headers:{
                    'Content-Type': "application/json"
                },
                method: "POST",
                body: JSON.stringify(new_clip_obj)
            });
            if(!response.ok){
                throw new Erro('cannot able to store clip in redis');
            }
        }catch(err){
            console.log(err);
        }
        
        
    };

    

    const handleDeleteClip = async (indexToDelete) => {
        console.log('Deleting clip at index:', indexToDelete);
        // Placeholder: Add logic to delete the clip (e.g., call server action)
        
        try{

            const response = await fetch(`/api/copyclip/${indexToDelete}`, {
                method: "DELETE",
            });
            if(!response.ok){
                throw new Erro('cannot able to delete clip in redis');
            }
            setClips(clips.filter((clip) => clip.id !== indexToDelete));
        }catch(err){
            console.log(err);
        }

    };

    return (
        <div className="container mx-auto p-4 pt-20 min-h-screen dark:text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">My Copy Clips</h1>

            {/* Input Form */}
            <form onSubmit={handleAddClip} className="mb-8 flex flex-col sm:flex-row gap-2 items-start sm:items-end">
                <textarea
                    value={newClip}
                    onChange={(e) => setNewClip(e.target.value)}
                    placeholder="Paste or type text here and save..."
                    className="flex-grow w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[60px]"
                    rows={3} // Suggest initial height (adjust as needed)
                />
                <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 flex justify-center items-center  bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out disabled:opacity-50 h-[50px]" // Adjusted height to better match textarea
                    disabled={!newClip.trim()} // Disable if input is empty
                >
                    Save Clip
                </button>
            </form>

            <div className="space-y-3">
            {
                loading===true
                ? "Loading" :
                (clips.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">No clips saved yet. Add one above!</p>
                ) : (
                    <ClipsList clips={clips} 
                     handleDeleteClip={handleDeleteClip}
                     />
                ))
            }   
            </div>
        </div>
    );
}