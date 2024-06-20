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
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setComments(data.comments);
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
    <div className="p-5 bg-gray-100 rounded-lg border-2 border-black w-[35%] absolute top-[35%] left-[30%] flex flex-col justify-center align-middle">
      <h2 className="text-2xl font-bold mb-5">Workers Comments</h2>
      {comments.length > 0 ? (
        comments.slice(0, 7).map((comment) => (
          <div key={comment._id} className="p-4 mb-4 border-b border-gray-300">
        
            <p className="text-lg mb-2">{comment.content}</p>
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
