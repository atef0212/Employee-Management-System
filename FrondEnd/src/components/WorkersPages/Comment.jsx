import { useContext, useState } from 'react';
import { AuthContext } from '../share/Context';

function Comment() {
  const { token, user } = useContext(AuthContext);
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/comments/${user.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
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
  );
}

export default Comment;
