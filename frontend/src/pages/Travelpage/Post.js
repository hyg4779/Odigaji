import axios from 'axios';
import { useEffect, useState, Helmet } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import server from '../../API/server';
import parse from 'html-react-parser';
import './Post.css';
import { Table } from 'react-bootstrap';

let postId;

function Post() {
  let params = useParams();
  let navigate = useNavigate();
  postId = params.postId;
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [createDay, setCreateDay] = useState();
  const [updateDay, setUpdateDay] = useState();
  const [user, setUser] = useState();
  const [comments, setComments] = useState();
  const [city, setCity] = useState();
  const [newComment, setNewComment] = useState({
    content: 'string',
  });
  const MoveList = (cityId) => {
    //관광지 목록으로 이동
    navigate('/local/travelDetail/board/' + cityId);
  };

  const deletePost = () => {
    //게시글 삭제
    const jwt = sessionStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';

    axios
      .delete(
        server.BASE_URL +
          server.ROUTES.getReview +
          postId +
          '/' +
          'review_info/'
      )
      .then((res) => {
        if (res.status == 200) {
          alert('게시글이 삭제되었습니다.');
          navigate('/local/travelDetail/board/' + city);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('권한이 없습니다.');
      });
  };
  const deleteComment = (id) => {
    //댓글삭제
    const jwt = sessionStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';

    axios
      .delete(server.BASE_URL + server.ROUTES.comment + 'edit/' + id + '/')
      .then((res) => {
        if (res.status == 204) {
          alert('댓글이 삭제되었습니다');
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('권한이 없습니다.');
      });
  };
  const writeComment = () => {
    let temp = {
      content: newComment.content,
    };
    console.log(newComment);
    const jwt = sessionStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';
    axios
      // .post(server.BASE_URL + server.ROUTES.comment + params.postId, temp + '/')
      .post(
        server.BASE_URL + server.ROUTES.comment + params.postId + '/',
        newComment
      )
      .then((res) => {
        if (res.status == 201) {
          alert('댓글 작성이 완료되었습니다');
          alert();
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('댓글작성에 실패했습니다.');
      });
  };
  useEffect(() => {
    //새로고침용,,,
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
        setUser(res.data.user.username);
        setCity(res.data.city);
      });

    //댓글 요청
    axios
      .get(server.BASE_URL + server.ROUTES.comment + postId + '/')
      .then((res) => {
        console.log(res);
        setComments(res.data);
      });
  }, [title]);

  return (
    <div className="post">
      <div className=" m-5 p-5">
        <div className="content post-child-div">
          <Table striped bordered hover className="ml-5 shadow p-3">
            <tbody>
              <tr>
                <th>제목</th>
                <td>
                  <h1>{title}</h1>
                </td>
              </tr>
              <tr>
                <th>작성일</th>
                <td>{createDay}</td>
              </tr>

              <tr>
                <th>작성자</th>
                <td>{user}</td>
              </tr>
              <tr>
                <th>내용</th>
                <td dangerouslySetInnerHTML={{ __html: content }}></td>
                {/* <div>{parse(content && content)}</div> */}
              </tr>
            </tbody>
          </Table>
          <div id="post-del-div">
            <button
              type="button"
              className="btn btn-danger post-del-btn m-1 mb-3 shadow"
              onClick={() => {
                deletePost();
              }}
            >
              글삭제
            </button>
          </div>
        </div>
        <div className="comment m-5">
          <Table striped bordered hover className="comment-table shadow p-3 ">
            <thead>
              <tr>
                <th>작성자</th>
                <th className="comment-content">댓글내용</th>
                <th>작성일시</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {comments &&
                comments.map((data, key) => {
                  return (
                    <tr key={key} className="comment-tr">
                      <td>{data.user.nickname}</td>
                      <td>{data.content}</td>
                      <td>{data.created}</td>
                      <td>
                        {' '}
                        <button
                          type="button"
                          className="btn btn-danger comment-del-btn"
                          onClick={() => {
                            deleteComment(data.id);
                          }}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div className="input-group mb-2 ">
            <input
              type="text"
              className="form-control"
              placeholder="댓글을 입력해주세요"
              onChange={(event) =>
                setNewComment({ content: event.target.value })
              }
            />
            <button
              className="btn comment-btn"
              type="button"
              id="button-addon2"
              onClick={() => {
                writeComment();
              }}
            >
              댓글 작성
            </button>
          </div>
          <button
            className="btn list-btn"
            id="menu"
            onClick={() => {
              MoveList(city);
            }}
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
}
export default Post;
