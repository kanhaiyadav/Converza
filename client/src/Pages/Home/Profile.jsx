import { Header, Body } from "./Profile.styles";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/user/user.selector";
import { FiUserPlus } from "react-icons/fi";
import { LuUserCog } from "react-icons/lu";
import { TbUserEdit } from "react-icons/tb";
import { PiSignOutFill } from "react-icons/pi";
import { logout } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import OptionModal from "../../components/OptionModal/OptionModal";


const Profile = ({ closeProfile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUserInfo);
    return (
        <OptionModal
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            closeModal={closeProfile}
            style={{
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
                <div>
                    <TbUserEdit />
                    <span>Edit Profile</span>
                </div>
                <div>
                    <LuUserCog />
                    <span>All Settings</span>
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
        </OptionModal>
    );
};

export default Profile;