import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { FaSave, FaTrash } from 'react-icons/fa';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('https://mnwefvnykbgyhbdzpleh.supabase.co/rest/v1/notes', {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setNotes(data))
    .catch(error => console.error('Error fetching notes:', error));
  }, []);

  const handleAddNote = () => {
    const newNote = { content: input };
    fetch('https://mnwefvnykbgyhbdzpleh.supabase.co/rest/v1/notes', {
      method: 'POST',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
    .then(response => response.json())
    .then(data => {
      setNotes([...notes, data]);
      setInput('');
    })
    .catch(error => console.error('Error adding note:', error));
  };

  const handleDeleteNote = (id) => {
    fetch(`https://mnwefvnykbgyhbdzpleh.supabase.co/rest/v1/notes?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg',
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setNotes(notes.filter(note => note.id !== id));
    })
    .catch(error => console.error('Error deleting note:', error));
  };

  return (
    <VStack spacing={4}>
      <Input placeholder="Add a new note" value={input} onChange={(e) => setInput(e.target.value)} />
      <Button leftIcon={<FaSave />} colorScheme="blue" onClick={handleAddNote}>Add Note</Button>
      {notes.map(note => (
        <Box key={note.id} p={5} shadow="md" borderWidth="1px">
          <Text>{note.content}</Text>
          <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteNote(note.id)}>Delete</Button>
        </Box>
      ))}
    </VStack>
  );
};

export default Notes;