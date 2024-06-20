import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../share/Context';

function AllComments() {
  const { token } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
console.log("token", token)
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
          console.log("data",data)
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
    <div>
      <h2>All Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id}>
          
            <p>{comment.content}</p>
          
            <small>{new Date(comment.createdAt).toLocaleString()}</small> 
          </div>
        ))
      ) : (
        <p>No comments found</p>
      )}
    </div>
  );
}

export default AllComments;
