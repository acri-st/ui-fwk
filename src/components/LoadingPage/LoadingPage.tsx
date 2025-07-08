import React, { ReactNode, useEffect, useState } from 'react';

import './LoadingPage.css';
import { Page } from '../Page/Page';
import { Loading } from '../Loading/Loading';
import { euImage } from '../../theme/images';
// import { highwayLogoSVG } from '../../theme/images';

type IProps = {
    title: ReactNode
};


export function LoadingPage(props: IProps) {
    return (
        <Page id="loading-page" fixedHeight withoutFooter disableScrollTop withoutRouter>
            <div className="fixed-page-content">
                <div className="loading-content">
                    <div className="loading-destine-logo destine-logo">
                        <img src={euImage} />
                        <label>
                            Destination Earth
                        </label>
                    </div>
                    <div className="loading-title">
                        {props.title}
                    </div>
                    <Loading />
                </div>
            </div>

        </Page>
    );
};

export default LoadingPage;
