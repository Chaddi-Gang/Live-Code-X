import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  CardHeader,
  useTheme,
  Fade,
  Slide
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import ShareIcon from '@mui/icons-material/Share';
import PreviewIcon from '@mui/icons-material/Preview';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: { xs: 6, md: 8 },
          mb: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            animation: 'moveBackground 20s linear infinite',
          },
          '@keyframes moveBackground': {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '100% 100%' },
          },
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box>
              <Typography 
                variant="h1" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  animation: 'fadeInUp 0.8s ease-out',
                }}
              >
                Live Code X
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                  animation: 'fadeInUp 0.8s ease-out 0.2s backwards',
                }}
              >
                Real-time collaborative code editor for seamless team coding
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2,
                  animation: 'fadeInUp 0.8s ease-out 0.4s backwards',
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CodeIcon />}
                  onClick={() => navigate('/editor')}
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    '&:hover': { 
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    } 
                  }}
                >
                  Start Coding
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ShareIcon />}
                  onClick={() => navigate('/share')}
                  sx={{ 
                    borderColor: 'white', 
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    '&:hover': { 
                      borderColor: 'white', 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    } 
                  }}
                >
                  Share Code
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Typography 
            variant="h2" 
            component="h2" 
            align="center" 
            gutterBottom 
            sx={{ 
              mb: 6,
              color: 'primary.main',
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Features
          </Typography>
        </Fade>
        <Grid container spacing={4}>
          {[
            {
              icon: <CodeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
              title: 'Real-time Editing',
              description: 'Collaborate with your team in real-time. See changes instantly as they happen.',
            },
            {
              icon: <ShareIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
              title: 'Easy Sharing',
              description: 'Share your code with anyone using a simple link. No setup required.',
            },
            {
              icon: <PreviewIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
              title: 'Live Preview',
              description: 'See your code changes in real-time with our live preview feature.',
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Slide direction="up" in timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease-in-out',
                    },
                    '&:hover::before': {
                      transform: 'scaleX(1)',
                    },
                  }}
                >
                  <CardHeader
                    avatar={feature.icon}
                    title={
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {feature.title}
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 