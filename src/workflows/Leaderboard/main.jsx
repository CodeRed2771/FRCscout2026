import { useState, useEffect } from 'react'
import '../../css/App.css'
import useLocalStorage from '../../utils/useLocalStorage';
import PageNav from '../../components/PageNav'

function Leaderboard({fetchData}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comp, setComp] = useState("Overall");
    const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 0);
    const [backText, setBackText] = useLocalStorage('backText',"Back To Main");

    const backToMain = () => {
        window.location = "/"
    }

    const handleNext = () => {
        if(currentPage != pages.length - 1) {
        setCurrentPage(currentPage + 1);
        setBackText("Back")
        } if(currentPage === pages.length - 2) {
        setDisabled({...disabled, nextBtn: true})
        }
    }

    const handleBack = () => {
        // If we are on the first page, go home
        if (currentPage === 0) {
            backToMain();
        }
    };

    useEffect(() => {
        // 1. Create the async wrapper
        const executeFetch = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // 2. Call the function passed via props
            const result = await fetchData();
            setData(result);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
        };

        executeFetch();

        // 3. Add fetchRemoteData to the dependency array
    }, [fetchData]);

    const sortData = (compdata, compparam) => {
        let compSorted = [];
        let dat = []

        compdata.match.forEach((item) => {dat.push(item)})
        compdata.hp.forEach((item) => {dat.push(item)})

        if(compparam === "Overall") {
            compSorted = dat;
        } else {
            dat.forEach((item) => {
                if(item["Competition"] === compparam) compSorted.push(item)
            });
        }

        let scouterSorted = {};

        compSorted.forEach((item) => {
            if(scouterSorted[item.Scouter]) {
                scouterSorted[item.Scouter] += 1;
            } else {
                scouterSorted[item.Scouter] = 1;
            }
        })

        if (!compSorted[0]) return "There is no data for this competition yet..."
    
        return (
            <table>
                <thead>
                <tr>
                    <th>Scouter</th>
                    <th>Matches Scouted</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(scouterSorted)
                    .sort(([, a], [, b]) => b - a) // Sorts by count, descending
                    .map(([name, count]) => (
                    <tr key={name}>
                        <td>{name}</td>
                        <td>{count}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            );
    }

    return (
        <>
        <div className="leaderboard-page tuff-load">
            <h1>Scouting Leaderboard</h1>
            <div className="input-group">
                <label>Competition:</label>
                <select onChange={(e) => setComp(e.target.value)}>
                    <option value="Overall">Overall</option>
                    <option value="Kentwood">Kentwood</option>
                    <option value="Muskegon">Muskegon</option>
                </select>
            </div>
            <div>{loading ? <p>Loading Leaderboard...</p> : error ? <p>Error: {error}</p> : sortData(data, comp)}</div>
        </div>

       <PageNav nextButton={true} handleBack={handleBack} backText={backText} handleNext={handleNext}/>
        </>
    );
}

export default Leaderboard