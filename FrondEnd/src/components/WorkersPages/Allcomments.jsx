



import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../share/Context';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

function AllComments() {
  const { token } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      if (!token) {
        console.error('Token is not available');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/comment', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          // Sort comments by createdAt in descending order
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setComments(data);
        } else {
          const errorData = await response.json();
          console.error('Error fetching comments:', errorData.message);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [token]);

  const handleCommentDelete = async (commentId) => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/comment/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Comment deleted successfully');
        setComments(comments.filter(comment => comment._id !== commentId));
      } else {
        const errorData = await response.json();
        console.error('Error deleting comment:', errorData.message);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleCommentEdit = async (commentId) => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/comment/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text: editCommentText }),
      });

      if (response.ok) {
        console.log('Comment edited successfully');
        const updatedComment = await response.json();
        setComments(comments.map(comment => comment._id === commentId ? updatedComment : comment));
        setEditCommentId(null);
        setEditCommentText('');
      } else {
        const errorData = await response.json();
        console.error('Error editing comment:', errorData.message);
      }
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const startEditing = (comment) => {
    setEditCommentId(comment._id);
    setEditCommentText(comment.text);
  };

  const cancelEditing = () => {
    setEditCommentId(null);
    setEditCommentText('');
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg border-2 border-black w-full md:w-[35%] mx-auto mt-10 flex flex-col absolute top-[30%] left-[30%]">
      <h2 className="text-2xl font-bold mb-5">Workers Comments</h2>
      {comments.length > 0 ? (
        comments.slice(0, 7).map((comment) => (
          <div key={comment._id} className="p-4 mb-4 border-b border-gray-200">
            {editCommentId === comment._id ? (
              <div>
                <textarea
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={() => handleCommentEdit(comment._id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-3">
                  {comment.userId && comment.userId.avatarImg && (
                    <img 
                      src={comment.userId.avatarImg.url} 
                      alt={`${comment.userId.name}'s avatar`} 
                      className="w-10 h-10 rounded-full mr-3" 
                    />
                  )}
                  <h3 className="text-lg font-semibold">
                    {comment.userId ? comment.userId.name : 'Unknown User'}
                  </h3>
                </div>
                <p className="text-base mb-2">{comment.text}</p>
                <small className="text-gray-500">{new Date(comment.createdAt).toLocaleString()}</small>
                <button
                  onClick={() => startEditing(comment)}
                  className="ml-4 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCommentDelete(comment._id)}
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No comments found</p>
      )}
    </div>
  );
}

export default AllComments;

