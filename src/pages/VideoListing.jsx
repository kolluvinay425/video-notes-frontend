import React, { useEffect, useState } from "react";
import { Spinner, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddVideo from "../components/AddVideo";
export default function VideoListing() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/videos");
      if (response.ok) {
        const videosArray = await response.json();
        setVideos(videosArray);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, []);
  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else {
    if (error) {
      return <div>{error}</div>;
    } else {
      return (
        <Row>
          <p style={{ textAlign: "right", marginTop: 20 }}>
            <AddVideo fetchVideos={fetchVideos} />
          </p>
          {videos.map((video) => (
            <Col>
              <Link to={`/video/${video.id}`}>
                <Card>
                  <video
                    src={video.url}
                    width={"100%"}
                    style={{ maxWidth: 320 }}
                  />
              
                  <Card.Body>
                    <Card.Title>{video.title}</Card.Title>
                    <Card.Text>{video.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      );
    }
  }
}
