/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import React from 'react';
import { Breadcrumb } from 'antd';
var WechatBox = React.createClass({
    render: function () {
        return (
                <div className="layout-container">
                    <Breadcrumb>
                        <Breadcrumb.Item>前台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>微信管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="layout-content">
                        这是【微信管理】
                    </div>
                </div>
                );
    }
});

module.exports = WechatBox;