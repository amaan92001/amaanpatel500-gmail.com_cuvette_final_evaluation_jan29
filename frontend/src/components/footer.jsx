import { LuExternalLink } from "react-icons/lu";
import './footer.css'; 


function Footer() {
    return (
        <>
            <div className='footer'>
                <div className="menus">
                    <div className="footer-text">Made with ❤️ by <br />
                    @cuvette</div>
                    <div>
                        <li>Status <LuExternalLink/></li>
                        <li>Documentation <LuExternalLink/></li>
                        <li>Roadmap <LuExternalLink/></li>
                        <li>Pricing <LuExternalLink/></li>
                    </div>
                    <div>
                        <li>Discord <LuExternalLink/></li>
                        <li>GitHub repository <LuExternalLink/></li>
                        <li>Twitter <LuExternalLink/></li>
                        <li>LinkedIn <LuExternalLink/></li>
                        <li>OSS Friends <LuExternalLink/></li>
                    </div>
                    <div>
                        <li>About <LuExternalLink/></li>
                        <li>Contact <LuExternalLink/></li>
                        <li>Terms of Service <LuExternalLink/></li>
                        <li>Privacy Policy <LuExternalLink/></li>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;