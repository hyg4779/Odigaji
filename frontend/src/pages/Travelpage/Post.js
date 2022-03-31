import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import server from '../../API/server';
import parse from 'html-react-parser';
import { Table } from 'react-bootstrap';
let postId;
function deletePost() {
  console.log(
    server.BASE_URL + server.ROUTES.getReview + postId + '/' + 'review_info/'
  );
  const jwt = sessionStorage.getItem('jwt');
  axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';

  axios.delete(
    server.BASE_URL + server.ROUTES.getReview + postId + '/' + 'review_info/'
  );
}

function Post() {
  let params = useParams();
  postId = params.postId;
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [createDay, setCreateDay] = useState();
  const [updateDay, setUpdateDay] = useState();
  const [user, setUser] = useState();
  const [comments, setComments] = useState();
  useEffect(() => {
    //게시글 요청
    axios
      .get(
        server.BASE_URL +
          server.ROUTES.getReview +
          postId +
          '/' +
          server.ROUTES.reviewInfo
      )
      .then((res) => {
        console.log(res);
        setContent(res.data.content);
        setTitle(res.data.title);
        setCreateDay(res.data.created);
        setUpdateDay(res.data.updated);
        setUser(res.data.user);
      });

    //댓글 요청
    axios
      .get(server.BASE_URL + server.ROUTES.comment + postId + '/')
      .then((res) => {
        console.log(res);
        setComments(res.data);
      });
  }, []);

  return (
    <div>
      <div className="content">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                <h1>{title}</h1>
              </td>
            </tr>
            <tr>
              <td>{createDay}</td>
            </tr>
            <tr>
              <td>작성자 : {user}</td>
            </tr>
            <tr>
              <td>{content}</td>
              {/* <div>{parse(content)}</div> */}
            </tr>
          </tbody>
        </Table>
        <div class="btn-group btn-group-lg">
          <button type="button" class="btn btn-primary">
            수정
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              deletePost();
            }}
          >
            삭제
          </button>
        </div>
      </div>
      {/* <div className="comment">{comments[0].content}</div> */}
    </div>
  );
}
export default Post;
