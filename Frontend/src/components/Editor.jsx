import React, { useState } from 'react';
import { Box, Button, Typography, IconButton, Select, MenuItem, FormControl, InputLabel, Alert, Snackbar, useTheme, useMediaQuery, Paper, Divider, Chip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeVisualization from './CodeVisualization';

const CodeEditor = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [code, setCode] = useState('// Start coding here...\nx = 10\ny = 20\nz = 30');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [stats, setStats] = useState({ time: 0, memory: 0 });

  const handleRunCode = () => {
    setIsRunning(true);
    setError('');
    setOutput('');

    // Simulate code execution with mock data
    setTimeout(() => {
      if (code.includes('error')) {
        setError('Syntax Error: Invalid code structure');
      } else if (code.includes('loop')) {
        setOutput('1\n2\n3\n4\n5');
      } else {
        setOutput('Code executed successfully!');
      }
      setIsRunning(false);
      setStats({ time: Math.random() * 1000, memory: Math.random() * 100 });
    }, 1000);
  };

  const handleStopCode = () => {
    setIsRunning(false);
    setOutput('Code execution stopped');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setSnackbarMessage('Code copied to clipboard!');
    setShowSnackbar(true);
  };

  const handleClearCode = () => {
    setCode('');
    setOutput('');
    setError('');
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row',
      height: '100%',
      gap: 2,
      p: 2,
      backgroundColor: theme.palette.background.default,
    }}>
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.paper,
          borderRadius: 1,
          boxShadow: `0 4px 6px ${theme.palette.action.hover}`,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              label="Language"
              onChange={handleLanguageChange}
              sx={{
                '& .MuiSelect-select': {
                  py: 1,
                },
              }}
            >
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="javascript">JavaScript</MenuItem>
              <MenuItem value="java">Java</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrowIcon />}
              onClick={handleRunCode}
              disabled={isRunning}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
              }}
            >
              Run
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<StopIcon />}
              onClick={handleStopCode}
              disabled={!isRunning}
            >
              Stop
            </Button>
            <IconButton
              onClick={handleCopyCode}
              color="primary"
              sx={{
                '&:hover': {
                  color: theme.palette.primary.main,
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              <ContentCopyIcon />
            </IconButton>
            <IconButton
              onClick={handleClearCode}
              color="error"
              sx={{
                '&:hover': {
                  color: theme.palette.error.main,
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ flex: 1, position: 'relative' }}>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                width: '100%',
                height: '100%',
                padding: '1rem',
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '1.5',
                border: 'none',
                resize: 'none',
                backgroundColor: 'transparent',
                color: theme.palette.text.primary,
              }}
              spellCheck="false"
            />
          </Box>

          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <Chip
              icon={<PlayArrowIcon />}
              label={`Time: ${stats.time.toFixed(2)}ms`}
              color="primary"
              variant="outlined"
              size="small"
            />
            <Chip
              icon={<DeleteIcon />}
              label={`Memory: ${stats.memory.toFixed(2)}MB`}
              color="secondary"
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>
      </Paper>

      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            boxShadow: `0 4px 6px ${theme.palette.action.hover}`,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Output
            </Typography>
          </Box>

          <Box sx={{ 
            flex: 1, 
            p: 2,
            backgroundColor: theme.palette.background.default,
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap',
            overflow: 'auto',
          }}>
            {error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : (
              output
            )}
          </Box>
        </Paper>

        <CodeVisualization code={code} isRunning={isRunning} />
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default CodeEditor;
