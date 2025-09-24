import React, { useState, useEffect } from "react";
import { 
  X, 
  Edit, 
  MessageSquare, 
  User, 
  Send 
} from "lucide-react";

export default function TicketDetail({ ticket, users = [], onClose, onEdit }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  // Mock comments for demonstration
  useEffect(() => {
    setComments([
      {
        _id: "1",
        message: "Initial ticket description has been received and we are reviewing it.",
        author: { name: "Support Agent" },
        createdAt: new Date().toISOString(),
        internal: false
      },
      {
        _id: "2", 
        message: "Customer contacted via email for additional information.",
        author: { name: "John Smith" },
        createdAt: new Date().toISOString(),
        internal: true
      }
    ]);
  }, [ticket]);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    }).format(date);
  };

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getUserName = (userId) => {
    if (typeof userId === 'string') {
      const user = users.find(u => u._id === userId);
      return user?.name || 'Unknown User';
    }
    return userId?.name || 'Unknown User';
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      _id: Date.now().toString(),
      message: newComment,
      author: { name: "Current User" },
      createdAt: new Date().toISOString(),
      internal: isInternal
    };

    setComments(prev => [...prev, comment]);
    setNewComment("");
    setIsInternal(false);
  };

  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="theme-bg-primary rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 theme-border border-b">
          <div>
            <h2 className="text-xl font-semibold theme-text-primary">
              Ticket #{ticket._id}
            </h2>
            <p className="text-sm theme-text-secondary">
              Created by{" "}
              <span className="theme-text-primary font-bold">
                {ticket.createdBy?.name ||
                  getUserName(ticket.createdBy?._id || ticket.createdBy) ||
                  "Unknown"}{" "}
              </span>
              on {formatDate(new Date(ticket.createdAt))}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-2 theme-bg-hover rounded-full theme-text-secondary"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 theme-bg-hover rounded-full theme-text-secondary"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Ticket Info */}
          <div className="theme-bg-secondary rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold theme-text-primary">{ticket.title}</h3>
            <p className="theme-text-primary">{ticket.description}</p>
          </div>

          {/* Comments */}
          <div>
            <h3 className="text-lg font-semibold flex items-center theme-text-primary">
              <MessageSquare className="h-5 w-5 mr-2" />
              Comments ({comments.length})
            </h3>
            <div className="space-y-4 mt-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="theme-border border rounded-lg p-4 theme-bg-primary"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <p className="font-medium theme-text-primary">
                        {comment.author?.name || "User"}
                      </p>
                      <span className="text-xs theme-text-secondary">
                        {formatDateTime(new Date(comment.createdAt))}
                      </span>
                      {comment.internal && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Internal
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="theme-text-primary whitespace-pre-wrap">
                    {comment.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Add Comment */}
          <form
            onSubmit={handleSubmitComment}
            className="theme-bg-secondary rounded-lg p-4"
          >
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              className="w-full px-3 py-2 theme-border border rounded-lg mb-3 theme-bg-primary theme-text-primary"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isInternal}
                  onChange={(e) => setIsInternal(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="ml-2 text-sm theme-text-primary">Internal note</span>
              </label>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4 mr-1 inline cursor-pointer" /> Add
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}