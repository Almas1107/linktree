import axios from "axios";
import type { GetServerSideProps } from "next";
type LinkType = {
  title: string;
  url: string;
};
type UserDataType = {
  id: number;
  Username: string;
  Image: string;
  Bio: string;
  Links: LinkType[];
};
export default function UserInterface({
  userData,
}: {
  userData: UserDataType;
}) {
  const Linklist: React.FC<LinkType> = (props) => {
    const { title, url } = props;
    return (
      <a
        href={url}
        target="_blank"
        className="w-[100%] h-[20%]"
        style={{
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingTop: "16px",
          paddingBottom: "16px",
          background: "rgba(255, 255, 255, 0.10)",
          borderRadius: "8px",
          border: "1px rgba(255, 255, 255, 0.50) solid",
          backdropFilter: "blur(8px)",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          display: "inline-flex",
        }}
      >
        <div
          style={{
            flex: "1 1 0",
            textAlign: "center",
            color: "white",
            fontSize: "16px",
            fontFamily: "Inter",
            fontWeight: 500,
            lineHeight: "24px",
            wordWrap: "break-word",
          }}
        >
          {title}
        </div>
      </a>
    );
  };
  return (
    <div className=" bg-gradient-to-bl from-violet-700 via-black to-indigo-800 h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col w-[30%] h-[65%] items-center justify-evenly">
        <div className="flex flex-col items-center gap-3">
          <img className="h-20 w-20 rounded-full" src={userData.Image} alt="" />
          <h1 className="text-white">@{userData.Username}</h1>
        </div>
        <div>
          <label className="switch m-64">
            <input
              className="switch__input"
              type="checkbox"
              role="switch"
              name="dark"
            />
            <svg
              className="switch__icon"
              width="24px"
              height="24px"
              aria-hidden="true"
            >
              <use href="#light"></use>
            </svg>
            <svg
              className="switch__icon"
              width="24px"
              height="24px"
              aria-hidden="true"
            >
              <use href="#dark"></use>
            </svg>
            <span className="switch__inner"></span>
            <span className="switch__inner-icons">
              <svg
                className="switch__icon"
                width="24px"
                height="24px"
                aria-hidden="true"
              >
                <use href="#light"></use>
              </svg>
              <svg
                className="switch__icon"
                width="24px"
                height="24px"
                aria-hidden="true"
              >
                <use href="#dark"></use>
              </svg>
            </span>
            <span className="switch__sr">Dark Mode</span>
          </label>
        </div>
        <div className="flex flex-col items-center w-[80%] gap-2">
          {userData.Links.map((el: LinkType, ind) => {
            return <Linklist key={ind} {...el} />;
          })}
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get(`http://localhost:3000/api/${id}`);
  return {
    props: {
      userData: res.data,
    },
  };
};
