import { useState } from "react";
import { Header, Body } from "./Profile.styles";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/user/user.selector";
import { FiUserPlus } from "react-icons/fi";
import { LuUserCog } from "react-icons/lu";
import { PiSignOutFill } from "react-icons/pi";
import { logout } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import OptionModal from "../../components/OptionModal/OptionModal";

const Profile = ({ closeProfile }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [settings, setSettings] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUserInfo);
    console.log(position)
    return (
        <OptionModal
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            closeModal={closeProfile}
            innerStyle={{
                bottom: "10px",
                left: "60px",
                width: "300px",
                height: "400px",
            }}
        >
            <Header>
                <img src={'/user.png'} alt="profile" />
                <div>
                    <h3>{user.username}</h3>
                    <span>{user.name}</span>
                </div>
            </Header>
            <Body>
                <div>
                    <FiUserPlus />
                    <span>Add Contact</span>
                </div>
                <div
                    onClick={(e) => {
                        setPosition({ x: e.pageX, y: e.pageY });
                        setSettings(true)
                    }}
                >
                    <LuUserCog />
                    <span>Profile & Settings</span>
                </div>
                <div
                    onClick={(e) => {
                        dispatch(logout());
                        navigate('/signin');
                    }}
                >
                    <PiSignOutFill />
                    <span>Sign Out</span>
                </div>

            </Body>
            {settings && (
                <OptionModal closeModal={() => setSettings(false)}
                    initial={{ opacity: 0, scale: 0.3}}
                    animate={{ opacity: 1, scale: 1 }}
                    innerStyle={{
                        position: "static",
                        width: "600px",
                        height: "500px",
                    }}
                    outerStyle={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.7)"
                    }}
                >
                    <div>
                        <h3>Settings</h3>
                        <p>Change your profile picture</p>
                        <p>Change your username</p>
                        <p>Change your password</p>
                        <p>Change your name</p>
                    </div>
                </OptionModal>
            )
            }
        </OptionModal>
    );
};

export default Profile;