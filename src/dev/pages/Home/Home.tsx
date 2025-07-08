import React, { useState } from 'react';

import './Home.css';
import { Navigation } from '../../../components/Navigation/Navigation';
import Page from '../../../components/Page/Page';
import { FaHome } from 'react-icons/fa';
import CheckList from '../../../components/CheckList/CheckList';

export default () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    return (
        <Page id="home" fixedHeight>
            <Navigation
                routes={[
                    { id: "home", path: '/', label: <><FaHome /></> }
                ]}
                profileRoutes={[]}
            />
            <div>
                <h1>Welcome to the UI Framework</h1>
            </div>
            <div>
                <h2>Components</h2>
                <div>
                    <h3>Checklist</h3>
                    <CheckList
                        id="checklist"
                        options={[
                            { label: "Item 1", value: "1" },
                            { label: "Item 2", value: "2" },
                            { label: "Item 3", value: "3" },
                        ]}
                        values={selectedItems}
                        onChange={setSelectedItems}
                    />
                </div>
            </div>
        </Page>
    );
};
