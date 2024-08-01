import { useParams } from "react-router-dom";
import WorkspaceHeader from "../components/workspaceheader";
import { useState, useEffect } from "react";
import axios from '../api/axios';
import './response.css';

function Response() {
    const { formId } = useParams();
    const [formName, setFormName] = useState('');
    const [linkCopied, setLinkCopied] = useState(false);
    const [responseData, setResponseData] = useState({});
    const [analytics, setAnalytics] = useState({ views: 0, starts: 0, completion: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submittedAt, setSubmittedAt] = useState(null);


    useEffect(() => {
        const fetchFormDetails = async () => {
            try {
                const response = await axios.get(`/api/forms/${formId}`);
                setFormName(response.data.name || '');
                setSubmittedAt(response.data.createdAt);
                setResponseData(response.data.MapResponseToHeading || {});
                setAnalytics({
                    views: response.data.views || 0,
                    starts: response.data.starts || 0,
                    completionRate: response.data.completionRate || 100
                });
                setLoading(false);
            } catch (error) {
                setError('Error fetching form details');
                setLoading(false);
                console.error('Error fetching form details:', error);
            }
        };
        fetchFormDetails();
    }, [formId]);

    return (
        <>
            <WorkspaceHeader
                formName={formName}
                setFormName={setFormName}
                linkCopied={linkCopied}
                setLinkCopied={setLinkCopied}
            />
            <div className="response-main">
                <div className="analytics">
                    <div className="views-box">
                        <h1>Views</h1> <br />
                        <h1>{analytics.views}</h1>
                    </div>
                    <div className="starts-box">
                        <h1>Starts</h1> <br />
                        <h1>{analytics.starts}</h1>
                    </div>
                    <div className="completion-box">
                        <h1>Completion Rate</h1> <br />
                        <h1>{analytics.completionRate}%</h1>
                    </div>
                </div>
                <div className="responses-table">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Submitted at</th>
                                    <th>Welcome</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>DOB/Text</th>
                                    <th>Ratings</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{responseData.welcome || '26/07/2024'}</td>
                                    <td>{responseData.welcome || 'Hallo'}</td>
                                    <td>{responseData.name || 'Amaan patel'}</td>
                                    <td>{responseData.email || ''}</td>
                                    <td>{responseData.dob || ''}</td>
                                    <td>{responseData.ratings || '5'}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default Response;
