import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectDirectorySections} from '../../redux/directory/directory.selectors.js';

import MenuItem from '../menu-item/menu-item';

import './directory.scss';

const Directory = ({sections}) => (
  <div className='directory-menu'>
      {
        sections.map(({id, ...otherSectionProps}) => (
        <MenuItem key={id} {...otherSectionProps}/>
        ))
            }
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);


//This {...otherSectionProps} is equal to this title={title}, size={size}, etc