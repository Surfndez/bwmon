/*
 *      Copyright (C) 2010 - 2020 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
 *
 *      Licensed under the Apache License, Version 2.0 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *           http: //www.apache.org/licenses/LICENSE-2.0
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 *
 * Bandwidth Monitor
 */

import React from 'react';
import { Paper } from '@material-ui/core';
import Chart from 'react-apexcharts';
import useUsageByYearGraph from '../../hooks/byyear/UseUsageByYearGraph';
import Loading from '../../components/loading/Loading';

const UsageByYearGraph = () => {
    const { options, series, loading } = useUsageByYearGraph();

    return (
        <Paper>
            <Loading isLoading={loading} />
            <Chart options={options} series={series} type="bar" height={500} />
        </Paper>
    );
};

export default UsageByYearGraph;
