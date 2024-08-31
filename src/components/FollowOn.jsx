import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const FollowOn = () => {
    return (
        <div
            className="faded-text pt-2" //custom - faded-text
        >
            <span>Follow on:</span>
            <div className="flex gap-4 pt-3">
                <a href="https://github.com/Soham-Kale">
                    <FaGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/soham-kale-723312240">
                    <FaLinkedin size={20} />
                </a>
                <a href="https://x.com/soham_kale_">
                    <FaXTwitter size={20} />
                </a>
            </div>
        </div>
    );
};

export default FollowOn;