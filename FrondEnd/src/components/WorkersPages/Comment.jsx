import { useContext, useState } from 'react';
import { AuthContext } from '../share/Context';

function Comment() {
  const { token, user } = useContext(AuthContext);
  const [comment, setComment] = useState('');

  console.log('Token from context:', token); // Debugging statement
  console.log('User from context:', user); // Debugging statement

  const handleCommentSubmit = async () => {
    if (!token || !user) {
      console.error('Token or user is not available');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/comment/${user.userId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ comments: comment }), // Note the change to { comments: comment }
      });

      if (response.ok) {
        console.log('Comment added successfully');
        setComment('');
      } else {
        const errorData = await response.json();
        console.error('Error adding comment:', errorData.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
  <>
      <div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here"
        rows="4"
        cols="50"
      />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
    </div>
  </>
  );
}

export default Comment;
