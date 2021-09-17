import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import BookmarkArea from "../components/BookmarkArea";
export default function VideoDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(false);
  const videoEl = useRef(null);
  const fetchVideoById = async () => {
    setLoading(true);
    console.log("fetching...");
    try {
      const response = await fetch(`http://localhost:3001/videos/${params.id}`);
      if (response.ok) {
        const video = await response.json();

        setVideo(video);
      } else {
        setError("video is not fetched");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoById();
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    if (error) {
      return <div>error</div>;
    } else {
      return (
        <div>
          <Row>
            <Col md={9}>
              <video
                ref={videoEl}
                style={{ marginTop: 20 }}
                width="100%"
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                src={video.url}
                controls
              />
            </Col>
            <Col md={3}>
              <BookmarkArea
                onTimeChange={(time) => {
                  videoEl.current.currentTime = time;
                  if(videoEl.current.paused){
                    videoEl.current.play()
                  }
                }}
                videoId={video.id}
                time={currentTime}
              />
            </Col>
          </Row>
        </div>
      );
    }
  }
}
