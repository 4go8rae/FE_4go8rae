import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";
import image1 from "../../assert/form/image1.png";
import Header from "../header/Header";
import { instance } from "../../shared/Api";

const PostFomr = () => {
  const navigate = useNavigate();
  const inputFocus = useRef(null);
  const [title, setTitle] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [isTitle, setIsTitle] = useState(false);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
  const [fileImage, setFileImage] = useState([]);

  //제목부분에 커서
  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  //이미지 리사이징
  const compressImage = async (image) => {
    try {
      const options = {
        maxSizeMb: 1,
        maxWidthOrHeight: 600,
        alwaysKeepResolution: true, //품질만 낮추고 항상 너비와 높이 유지
      };
      return await imageCompression(image, options);
    } catch (e) {
      console.log(e);
    }
  };

  //제목 유효성 검사
  const onChangeTitle = (e) => {
    const TitleRegex = /^(?=.*[a-zA-z0-9가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^*+=-]).{1,20}$/;
    const TitleCurrnet = e.target.value;
    setTitle(TitleCurrnet);

    if (!TitleRegex.test(TitleCurrnet)) {
      setTitleMessage("20글자 이하로 작성해주세요 ");
      setIsTitle(false);
    } else {
      setTitleMessage(null);
      setIsTitle(true);
    }
  };

  const onChangeHandler = (event, setState) => setState(event.target.value);

  //이미지 미리보기 및 리사이징
  const onChangeImg = async (e) => {
    const imageList = e.target.files;
    let imageLists = [...image];
    let imgFiles = [...fileImage];
    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl = URL.createObjectURL(e.target.files[i]);
      imgFiles.push(nowImageUrl);
    }
    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl1 = e.target.files[i];
      const compressedImage = await compressImage(nowImageUrl1);
      imageLists.push(compressedImage);
    }

    //이미지 개수 최대 1개까지 등록가능
    if (imageLists.length > 1) {
      Swal.fire({
        text: "이미지는 최대 1개까지 등록 가능합니다",
        icon: "warning",
      });
      imageLists = imageLists.slice(0, 1);
    }
    if (imgFiles.length > 1) {
      imgFiles = imgFiles.slice(0, 1);
    }
    setFileImage(imgFiles);
    setImage(imageLists);
  };

  //이미지 삭제
  const handleDeleteImage = (id) => {
    setFileImage(fileImage.filter((_, index) => index !== id));
    setImage(image.filter((_, index) => index !== id));
  };

  const onAddProduct = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
      price: price,
    };

    if (title === "" || price === 0) {
      Swal.fire({
        text: "필수항목을 입력해주세요.",
        icon: "warning",
      });
      return;
    }
    try {
      let json = JSON.stringify(data);
      const blob = new Blob([json], { type: "application/json" });
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }
      formData.append("data", blob);

      // 추후에 data => formData로 변경해야함
        await instance.post(`/api/auth/product`, data);
        Swal.fire({
          text: "상품이 등록되었습니다.",
          icon: "success",
        });
        navigate('/')
    } catch {
      Swal.fire({
        text: "상품 등록에 실패하였습니다",
        icon: "error",
      });
    }
  };

  return (
    <StDetailForm>
      <Box>
        <Header />
        <BoxTitle>
          <BoxSpan>
            <span>*</span>은 필수항목입니다.
          </BoxSpan>
        </BoxTitle>
        <LiTilte>
          <PTitle>
            제목
            <span style={{ color: "rgb(255, 80, 88)", fontWeight: "600" }}>
              *
            </span>
          </PTitle>
          <InputTit
            type="text"
            name="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력해주세요"
            ref={inputFocus}
          />
        </LiTilte>
        <Message>
          {title.length > 0 && <p style={{ color: "red" }}>{titleMessage}</p>}
        </Message>
        <Wrap>
          <RatingText>
            가격₩{" "}
            <span style={{ color: "rgb(255, 80, 88)", fontWeight: "600" }}>
              *
            </span>
          </RatingText>
          <PriceDiv>
            <InputPrice
              type="number"
              name="price"
              value={price}
              onChange={(event) => onChangeHandler(event, setPrice)}
              placeholder="가격을 입력해주세요"
            />
          </PriceDiv>
        </Wrap>
        <LiImg>
          <ImgTitle>
            <b>이미지</b>
            <span style={{ color: "rgb(255, 80, 88)", fontWeight: "600" }}>
              *
            </span>
          </ImgTitle>
          <ImgBox>
            <ImgLabel>
              <p style={{ marginTop: "14px", fontSize: "1.2em" }}>
                이미지 등록
              </p>
              <ImgInput
                type="file"
                name="imgUrl"
                accept="image/*"
                multiple
                onChange={onChangeImg}
                id="image"
              />
            </ImgLabel>
            {fileImage.length !== 0 ? (
              fileImage.map((image, id) => (
                <div key={id}>
                  <Img alt={`${image}-${id}`} src={image} />
                  <DeleteImg onClick={() => handleDeleteImage(id)}>X</DeleteImg>
                </div>
              ))
            ) : (
              <div>
                <NoneImg alt="preview" src={image1} />
              </div>
            )}
          </ImgBox>
        </LiImg>
        <ButDiv>
          <AddBut onClick={onAddProduct}>작성하기</AddBut>
          <CancelBut onClick={() => navigate("/")}>취소하기</CancelBut>
        </ButDiv>
      </Box>
    </StDetailForm>
  );
};

export default PostFomr;

const StDetailForm = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
`;

const Box = styled.div`
  margin: 0 20px;
  margin-top: 145px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border-radius: 10px;
`;
const BoxTitle = styled.div`
  justify-content: center;
`;

const BoxSpan = styled.p`
  color: rgb(255, 80, 88);
  text-align: right;
  line-height: 2rem;
  padding-right: 10px;
`;
const LiImg = styled.div`
  width: 100%;
  padding: 30px 0px 0px 0px;
  display: flex;
`;
const ImgTitle = styled.div`
  padding-left: 0.5rem;
  width: 25%;
  height: 48px;
  font-size: 20px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;
const ImgBox = styled.div`
  /* padding-left: 0.5rem; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const ImgInput = styled.input`
  display: none;
`;
const ImgLabel = styled.label`
  width: 99%;
  height: 52px;
  background-color: rgba(172, 212, 228, 0.35);
  border-radius: 15px;
  border: none;
  font-family: bold;
  margin-bottom: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 294px;
  font-synthesis: none;
  border-radius: 10px;
  ::-webkit-font-smoothing {
    -webkit-appearance: none;
    -webkit-font-smoothing: antialiased;
  }
`;
const NoneImg = styled.img`
  width: 100%;
  height: 294px;
  font-synthesis: none;
  border-radius: 10px;
  ::-webkit-font-smoothing {
    -webkit-appearance: none;
    -webkit-font-smoothing: antialiased;
  }
`;
const DeleteImg = styled.button`
  margin: -10.3px;
  position: relative;
  color: red;
  right: -45%;
  bottom: 90%;
  background-color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 2rem;
`;
const LiTilte = styled.div`
  padding: 10px 0px;
  display: flex;
  width: 100%;
`;
const PTitle = styled.b`
  padding-left: 0.5rem;
  width: 25%;
  height: 48px;
  font-size: 20px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;
const InputTit = styled.input`
  width: 95%;
  height: 52px;
  background-color: rgba(172, 212, 228, 0.35);
  border-radius: 15px;
  border: none;
  padding-left: 10px;
  font-family: bold;
`;
const Message = styled.div`
  margin-bottom: 25px;
  font-weight: 500;
  width: 96%;
  font-size: 1rem;
  text-align: end;
`;

const Wrap = styled.div`
  display: flex;
  /* flex-direction: column; */
`;

const RatingText = styled.b`
  padding-left: 0.5rem;
  width: 25%;
  height: 48px;
  font-size: 20px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;
const PriceDiv = styled.div`
  display: flex;
  width: 100%;
`;
const InputPrice = styled.input`
  width: 95%;
  height: 52px;
  background-color: rgba(172, 212, 228, 0.35);
  border-radius: 15px;
  border: none;
  padding-left: 10px;
  font-family: bold;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const ButDiv = styled.div`
  display: flex;
  margin: 40px auto;
  width: 80%;
`;
const AddBut = styled.button`
  cursor: pointer;
  color: white;
  background-color: #abd4e2;
  border: 0px;
  height: 2.5rem;
  border-radius: 5px;
  line-height: 2.5rem;
  margin-right: 1rem;
  width: 100%;
  font-weight: bold;
`;

const CancelBut = styled.button`
  cursor: pointer;
  font-weight: bold;
  color: #abd4e2;
  background-color: white;
  border: 3px solid #abd4e2;
  height: 2.5rem;
  /* margin-right:0.5rem; */
  border-radius: 5px;
  line-height: 2.1rem;
  /* margin-left:1rem; */
  width: 100%;
`;
