import PropTypes from 'prop-types';
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedMail } from '../redux/appSlice';
import { motion } from 'framer-motion';

const Message = ({ email }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openMail = () => {
        if (email?.createdAt) {
            dispatch(setSelectedMail(email));
            navigate(`/mail/${email.id}`);
        } else {
            console.error("Invalid createdAt field.");
        }
    };

    const formattedMessage = email?.message?.length > 130 
        ? `${email?.message.substring(0, 130)}...` 
        : email?.message;

    const formattedDate = (() => {
        if (typeof email.createdAt === 'string') {
            return new Date(email.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } else if (email.createdAt?.seconds) {
            return new Date(email.createdAt.seconds * 1000).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } else {
            return 'Invalid Date';
        }
    })();

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={openMail}
            className="flex items-start justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md"
        >
            <div className="flex items-center gap-3">
                <div className="flex-none text-gray-300">
                    <MdCropSquare className="w-5 h-5" />
                </div>
                <div className="flex-none text-gray-300">
                    <RiStarLine className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="font-semibold">{email?.to || 'No recipient'}</h1>
                </div>
            </div>
            <div className="flex-1 ml-4">
                <p className="text-gray-600 truncate inline-block max-w-full">{formattedMessage}</p>
            </div>
            <div className="flex-none text-gray-400 text-sm">
                <p>{formattedDate}</p>
            </div>
        </motion.div>
    );
};

Message.propTypes = {
    email: PropTypes.shape({
        id: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        createdAt: PropTypes.oneOfType([
            PropTypes.string, // ISO string
            PropTypes.shape({
                seconds: PropTypes.number.isRequired,
                nanoseconds: PropTypes.number,
                toDate: PropTypes.func, // Firebase Timestamp
            }),
        ]).isRequired,
    }).isRequired,
};

export default Message;
