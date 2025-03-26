import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Box, Typography, Paper, LinearProgress, useTheme, useMediaQuery, Fade, IconButton, Tooltip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';

const CodeVisualization = ({ code, isRunning }) => {
  const svgRef = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentStep, setCurrentStep] = useState(0);
  const [variables, setVariables] = useState([]);

  // Parse code to extract variables
  useEffect(() => {
    if (!code) return;
    
    const lines = code.split('\n');
    const newVariables = [];
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('x =') || trimmedLine.startsWith('y =') || trimmedLine.startsWith('z =')) {
        const [name, value] = trimmedLine.split('=').map(s => s.trim());
        newVariables.push({ name, value: parseInt(value) });
      }
    });
    
    setVariables(newVariables);
    setCurrentStep(0);
  }, [code]);

  useEffect(() => {
    if (!svgRef.current || variables.length === 0) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const width = svg.node().getBoundingClientRect().width;
    const height = isMobile ? 150 : 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 20 };

    // Create scales
    const x = d3.scaleLinear()
      .domain([0, variables.length - 1])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    // Create box dimensions
    const boxWidth = isMobile ? 50 : 60;
    const boxHeight = isMobile ? 50 : 60;
    const boxSpacing = isMobile ? 15 : 20;

    // Add boxes for each variable up to current step
    variables.slice(0, currentStep + 1).forEach((variable, index) => {
      const xPos = x(index);
      const yPos = y(50);

      // Add box
      svg.append("rect")
        .attr("x", xPos - boxWidth/2)
        .attr("y", yPos - boxHeight/2)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("fill", "none")
        .attr("stroke", theme.palette.primary.main)
        .attr("stroke-width", 2)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("opacity", 0)
        .transition()
        .duration(500)
        .delay(index * 100)
        .attr("opacity", 1);

      // Add value
      svg.append("text")
        .attr("x", xPos)
        .attr("y", yPos)
        .attr("text-anchor", "middle")
        .attr("fill", theme.palette.primary.main)
        .attr("font-weight", "bold")
        .attr("font-size", isMobile ? "12px" : "14px")
        .attr("opacity", 0)
        .attr("transform", `translateY(-10px)`)
        .transition()
        .duration(500)
        .delay(index * 100 + 300)
        .attr("opacity", 1)
        .attr("transform", "translateY(0)")
        .text(`${variable.name} = ${variable.value}`);

      // Add connecting lines
      if (index < currentStep) {
        svg.append("line")
          .attr("x1", xPos + boxWidth/2)
          .attr("y1", yPos)
          .attr("x2", xPos + boxWidth/2 + boxSpacing)
          .attr("y2", yPos)
          .attr("stroke", theme.palette.divider)
          .attr("stroke-width", 2)
          .attr("opacity", 0)
          .transition()
          .duration(500)
          .delay(index * 100 + 200)
          .attr("opacity", 1);
      }
    });

  }, [variables, currentStep, theme, isMobile]);

  const handleNextStep = () => {
    if (currentStep < variables.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <Fade in timeout={500}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.paper,
          borderLeft: isMobile ? 'none' : '1px solid',
          borderTop: isMobile ? '1px solid' : 'none',
          borderColor: 'divider',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 1,
          boxShadow: `0 4px 6px ${theme.palette.action.hover}`,
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2 
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: isMobile ? '1rem' : '1.25rem',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -4,
                left: 0,
                width: '100%',
                height: '2px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.3s ease-in-out',
              },
              '&:hover::after': {
                transform: 'scaleX(1)',
              },
            }}
          >
            Code Visualization
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Previous Step">
              <span>
                <IconButton 
                  size="small" 
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                  sx={{
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Next Step">
              <span>
                <IconButton 
                  size="small" 
                  onClick={handleNextStep}
                  disabled={currentStep === variables.length - 1}
                  sx={{
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Reset">
              <span>
                <IconButton 
                  size="small" 
                  onClick={handleReset}
                  disabled={currentStep === 0}
                  sx={{
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>
        
        {isRunning && (
          <LinearProgress 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '& .MuiLinearProgress-bar': {
                background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              },
            }} 
          />
        )}

        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
            ref={svgRef}
            style={{
              width: '100%',
              height: isMobile ? '150px' : '200px',
            }}
          />
        </Box>
      </Paper>
    </Fade>
  );
};

export default CodeVisualization; 