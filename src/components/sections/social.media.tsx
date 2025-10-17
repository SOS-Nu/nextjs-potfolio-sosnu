import { FaFacebook } from "react-icons/fa6";
import { SiUdemy } from "react-icons/si";
import { FaTiktok } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";

interface IProps {
    youtube: string;
    tiktok: string;
    udemy: string;
    facebook: string;
}
const SocialMedia = (props: IProps) => {
    const { youtube, tiktok, udemy, facebook } = props;

    return (
        <div className="my-4 d-flex items-center gap-3">
            <a href={youtube} target='_blank' className="highlight" title="Youtube Lê Văn Nguyên (SOS Nu)">
                <SiYoutubeshorts size={30} />
            </a>
            <a href={tiktok} target='_blank' className="highlight" title="Tiktok Lê Văn Nguyên (SOS Nu)">
                <FaTiktok size={30} />
            </a>
            <a href={udemy} target='_blank' className="highlight" title="Udemy Lê Văn Nguyên (SOS Nu)">
                <SiUdemy size={30} />
            </a>
            <a href={facebook} target='_blank' className="highlight" title="Facebook Lê Văn Nguyên (SOS Nu)">
                <FaFacebook size={30} />
            </a>

        </div>
    )
}

export default SocialMedia;