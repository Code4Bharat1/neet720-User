// src/components/AnalyticsDashboard.jsx
export const metadata = {
  title:
    "analytics | NEET720 – India's Most Trusted NEET Preparation Platform",
  description:
    "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
  openGraph: {
    url: "https://neet720.com/analytics",
    title: "analytics | NEET720",
    description:
      "NEET720 offers India’s best NEET mock tests, PYQs, analytics, AIR prediction, and smart learning tools for NEET aspirants.",
    siteName: "NEET720",
  },
};




"use client"
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton
} from '@mui/material';
import axios from 'axios';
import { useRouter } from "next/navigation";

// ✅ import icons from lucide-react
import { 
  TrendingUp, 
  TrendingDown, 
  Minus as TrendingFlat, 
  Star, 
  AlertTriangle as Warning, 
  CheckCircle, 
  ArrowLeft
} from "lucide-react";

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/review/analytics`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}` 
          }
        });
        setAnalytics(response.data.analytics);
        setError(null);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Test Analytics
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Test Analytics
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!analytics) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Test Analytics
        </Typography>
        <Alert severity="info">No analytics data available.</Alert>
      </Box>
    );
  }

  // Render progress trend icon
  const renderTrendIcon = (trend) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="text-green-600 w-6 h-6" />;
      case 'declining':
        return <TrendingDown className="text-red-600 w-6 h-6" />;
      default:
        return <TrendingFlat className="text-yellow-600 w-6 h-6" />;
    }
  };

  // Render mastery level chip
  const renderMasteryChip = (accuracy) => {
    const value = parseFloat(accuracy);
    let color = 'default';
    let label = 'Unknown';

    if (value >= 80) {
      color = 'success';
      label = 'Mastered';
    } else if (value >= 60) {
      color = 'primary';
      label = 'Proficient';
    } else if (value >= 40) {
      color = 'warning';
      label = 'Developing';
    } else {
      color = 'error';
      label = 'Needs Improvement';
    }

    return <Chip label={label} color={color} size="small" variant="outlined" />;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Back Button */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => router.push("/dashboard")} color="primary">
            <ArrowLeft className="w-6 h-6" />
          </IconButton>
          <Typography variant="h4" fontWeight="bold">
            Test Analytics
          </Typography>
        </Box>
      </Box>

      {/* Data Limitation Warning */}
      {analytics.dataLimitation && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          <Typography variant="body1" fontWeight="500">
            {analytics.dataLimitation.message}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button 
              variant="contained" 
              color="primary"
              href="/testselection"
            >
              Take More Tests
            </Button>
          </Box>
        </Alert>
      )}

      {/* Overall Performance */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3, "&:hover": { boxShadow: 6 } }}>
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight="600">
            Overall Performance
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box textAlign="center">
                <Typography variant="h3" color="primary" fontWeight="bold">
                  {analytics.overallPerformance.averageScore}%
                </Typography>
                <Typography variant="body2" color="text.secondary">Average Score</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box textAlign="center">
                <Typography variant="h3" color="secondary" fontWeight="bold">
                  {analytics.overallPerformance.highestScore}%
                </Typography>
                <Typography variant="body2" color="text.secondary">Highest Score</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box textAlign="center">
                <Typography variant="h3" color="error" fontWeight="bold">
                  {analytics.overallPerformance.lowestScore}%
                </Typography>
                <Typography variant="body2" color="text.secondary">Lowest Score</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box textAlign="center" display="flex" alignItems="center" justifyContent="center">
                {renderTrendIcon(analytics.overallPerformance.progressTrend)}
                <Typography variant="h6" sx={{ ml: 1 }} fontWeight="500">
                  {analytics.overallPerformance.progressTrend.charAt(0).toUpperCase() + 
                   analytics.overallPerformance.progressTrend.slice(1)}
                </Typography>
              </Box>
              <Typography variant="body2" textAlign="center" color="text.secondary">
                Progress Trend
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Subject Performance */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 2, "&:hover": { boxShadow: 5 } }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="600">
                Subject Performance
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Subject</b></TableCell>
                      <TableCell><b>Accuracy</b></TableCell>
                      <TableCell><b>Mastery</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(analytics.subjectPerformance).map(([subject, data]) => (
                      <TableRow key={subject} hover>
                        <TableCell>{subject}</TableCell>
                        <TableCell>{data.accuracy}%</TableCell>
                        <TableCell>{renderMasteryChip(data.accuracy)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Subject Comparison */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 2, "&:hover": { boxShadow: 5 } }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="600">
                Subject Comparison
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <Star className="text-green-600 w-5 h-5 mr-1" />
                  <Typography variant="h6">
                    Strongest Subject: {analytics.subjectComparison.strongest}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {analytics.subjectPerformance[analytics.subjectComparison.strongest]?.accuracy}% accuracy
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Warning className="text-red-600 w-5 h-5 mr-1" />
                  <Typography variant="h6">
                    Weakest Subject: {analytics.subjectComparison.weakest}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {analytics.subjectPerformance[analytics.subjectComparison.weakest]?.accuracy}% accuracy
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Tests */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 2, "&:hover": { boxShadow: 5 } }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="600">
                Recent Tests
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Date</b></TableCell>
                      <TableCell><b>Type</b></TableCell>
                      <TableCell><b>Score</b></TableCell>
                      <TableCell><b>Performance</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analytics.testPerformance.map((test) => (
                      <TableRow key={test.id} hover>
                        <TableCell>{new Date(test.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Chip 
                            label={test.type} 
                            variant="outlined" 
                            size="small" 
                            color="info"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" fontWeight="bold">
                            {test.score}%
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <LinearProgress 
                            variant="determinate" 
                            value={test.score} 
                            sx={{ width: 120, borderRadius: 1 }}
                            color={test.score >= 70 ? "success" : test.score >= 40 ? "warning" : "error"}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 2, "&:hover": { boxShadow: 5 } }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="600">
                Recommendations
              </Typography>
              <List>
                {analytics.recommendations.map((recommendation, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <CheckCircle className="text-blue-600 w-5 h-5 mr-2" />
                      <ListItemText primary={recommendation} />
                    </ListItem>
                    {index < analytics.recommendations.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
