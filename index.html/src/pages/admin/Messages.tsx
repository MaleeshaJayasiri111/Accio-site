import { useState } from 'react';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Eye,
  Trash2,
  Mail,
  Send,
  Check,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';
import type { Message } from '@/types';

export default function AdminMessages() {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');

  // Filter messages
  const filteredMessages = state.messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      dispatch({ type: 'DELETE_MESSAGE', payload: id });
      toast.success('Message deleted successfully');
    }
  };

  const handleReply = () => {
    if (selectedMessage && replyText.trim()) {
      dispatch({
        type: 'REPLY_MESSAGE',
        payload: { messageId: selectedMessage.id, reply: replyText },
      });
      toast.success('Reply sent successfully');
      setReplyText('');
      setSelectedMessage(null);
    }
  };

  const handleMarkAsRead = (message: Message) => {
    if (!message.isRead) {
      // In a real app, you would dispatch an action to mark as read
      toast.success('Message marked as read');
    }
  };

  const unreadCount = state.messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge className="mb-2 bg-primary/20 text-primary-foreground">Messages</Badge>
          <h1 className="font-display text-3xl font-bold text-secondary">Customer Messages</h1>
        </div>
        <Badge variant="destructive" className="w-fit">
          {unreadCount} Unread
        </Badge>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow
                key={message.id}
                className={!message.isRead ? 'bg-primary/5' : ''}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="font-display font-bold text-primary">
                        {message.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{message.name}</div>
                      <div className="text-sm text-muted-foreground">{message.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="line-clamp-2 max-w-md">{message.message}</p>
                </TableCell>
                <TableCell>
                  {new Date(message.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {message.isRead ? (
                    <Badge variant="secondary" className="gap-1">
                      <Check className="w-3 h-3" />
                      Read
                    </Badge>
                  ) : (
                    <Badge className="gap-1">
                      <Mail className="w-3 h-3" />
                      New
                    </Badge>
                  )}
                  {message.reply && (
                    <Badge variant="outline" className="ml-2">
                      Replied
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedMessage(message);
                        handleMarkAsRead(message);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(message.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Message Details Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Message Details
            </DialogTitle>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-6">
              {/* Sender Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-primary">
                    {selectedMessage.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{selectedMessage.name}</h3>
                  <p className="text-muted-foreground">{selectedMessage.email}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              {/* Previous Reply */}
              {selectedMessage.reply && (
                <div>
                  <h4 className="font-medium mb-2">Your Reply</h4>
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <p className="whitespace-pre-wrap">{selectedMessage.reply}</p>
                  </div>
                </div>
              )}

              {/* Reply Form */}
              {!selectedMessage.reply && (
                <div>
                  <h4 className="font-medium mb-2">Send Reply</h4>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    className="w-full mt-3"
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
