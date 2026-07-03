import { useState } from "react";
import { Header, Body, WallpaperGrid, WallpaperSwatch } from "./Profile.styles";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/user/user.selector";
import { FiUserPlus } from "react-icons/fi";
import { FaRegSun } from "react-icons/fa6";
import { BsMoonStars } from "react-icons/bs";
import { MdOutlineWallpaper } from "react-icons/md";
// import { LuUserCog } from "react-icons/lu";
import { PiSignOutFill } from "react-icons/pi";
import { logout } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import OptionModal from "../../components/OptionModal/OptionModal";
import Modal from "../../components/Modal/Modal.component";
import AddContactFrom from "../../components/AddContactForm/AddContactFrom.Component";
import { WALLPAPERS, getWallpaper } from "../../Styles/wallpapers";

const Profile = ({ closeProfile, theme, setTheme, wallpaper, setWallpaper }) => {
    const [displayAddContactModal, setAddContactModal] = useState(false);
    const [displayWallpaperModal, setWallpaperModal] = useState(false);
    // const [position, setPosition] = useState({ x: 0, y: 0 });
    // const [settings, setSettings] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUserInfo);

    const chooseWallpaper = (id) => {
        setWallpaper(id);
        localStorage.setItem("wallpaper", id);
    };
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
                background: theme === 'light' ? 'url(/sunny.svg)' : 'url(/moon1.svg)',
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
                <div
                    onClick={
                        () => setAddContactModal(true)
                    }
                >
                    <FiUserPlus />
                    <span>Add Contact</span>
                    {
                        displayAddContactModal &&
                        <Modal onClick={() => {
                            setAddContactModal(false)
                        }}>
                            <AddContactFrom closeModal={() => {
                                setAddContactModal(false)
                            }} />
                        </Modal>
                    }
                </div>
                <div
                    onClick={() => {
                        setTheme(theme === 'light' ? 'dark' : 'light');
                        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
                    }}
                >
                    {
                        theme === 'light' ? (
                            <>
                                <BsMoonStars />
                                <span>Dark Theme</span>
                            </>
                        ) : (
                            <>
                                <FaRegSun />
                                <span>Light Theme</span>
                            </>
                        )
                    }

                </div>
                <div
                    onClick={() => setWallpaperModal(true)}
                >
                    <MdOutlineWallpaper />
                    <span>Chat Wallpaper</span>
                    {
                        displayWallpaperModal &&
                        <Modal
                            onClick={() => setWallpaperModal(false)}
                            innerStyles={{
                                aspectRatio: 'auto',
                                width: '360px',
                                maxWidth: '90vw',
                                maxHeight: '80vh',
                                overflowY: 'auto',
                            }}
                        >
                            <div>
                                <h3 style={{ marginBottom: '10px' }}>Chat Wallpaper</h3>
                                <WallpaperGrid>
                                    {WALLPAPERS.map((w) => {
                                        const resolved = getWallpaper(w.id, theme);
                                        return (
                                            <WallpaperSwatch
                                                key={w.id}
                                                $selected={wallpaper === w.id}
                                                onClick={() => chooseWallpaper(w.id)}
                                            >
                                                <div
                                                    className="swatch-preview"
                                                    style={{
                                                        backgroundImage: resolved.image,
                                                        backgroundSize: resolved.size,
                                                        backgroundPosition: resolved.position,
                                                    }}
                                                />
                                                <span>{w.name}</span>
                                            </WallpaperSwatch>
                                        );
                                    })}
                                </WallpaperGrid>
                            </div>
                        </Modal>
                    }
                </div>
                {/* <div
                    onClick={(e) => {
                        setPosition({ x: e.pageX, y: e.pageY });
                        setSettings(true)
                    }}
                >
                    <LuUserCog />
                    <span>Profile & Settings</span>
                </div> */}
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
            {/* {settings && (
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
            } */}
        </OptionModal>
    );
};

export default Profile;