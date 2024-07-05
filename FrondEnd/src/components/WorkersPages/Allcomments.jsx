import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../share/Context';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

function AllComments() {
  const { token } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

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

  return (
    <div className="p-5 bg-gray-100 rounded-lg border-2 border-black w-full md:w-[35%] mx-auto mt-10 flex flex-col absolute top-[30%] left-[30%]">
    <h2 className="text-2xl font-bold mb-5">Workers Comments</h2>
    {comments.length > 0 ? (
      comments.slice(0, 7).map((comment) => (
        <div key={comment._id} className="p-4 mb-4 border-b border-gray-200">
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
        </div>
      ))
    ) : (
      <p>No comments found</p>
    )}
  </div>
  );
}

export default AllComments;
