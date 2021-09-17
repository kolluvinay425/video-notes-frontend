import React, { useEffect, useState, useCallback, } from "react";
import { useParams } from "react-router";
import { Row, Col} from "react-bootstrap"

export default function VideoDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVideoById = async () => {
      setLoading(true);
      console.log("fetching...");
      try {
        const response = await fetch(
          `http://localhost:3001/videos/${params.id}`
        );
        if (response.ok) {
          const video = await response.json();
          console.log(video);
          setVideo(video);
        } else {
          setError("video is not fetched");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

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
              <video style={{marginTop:20}} width="100%" src={video.url} controls />
              <h1>{video.title}</h1>
            </Col>
            <Col md={3}>

            </Col>
          </Row>
        </div>
      );
    }
  }
}
