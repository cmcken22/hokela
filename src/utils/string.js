import React, { Component } from 'react';
import DocumentLink from 'Components/DocumentLink';

export const FormatLink = (message = "", action = null) => {
  let formattedMessage = () => message;
  let [beggining, middle, end] = message.split(/(\@\{\{[A-z\s]+\}\})/g);
  middle = middle.replace(/[@\{\}]/g, '');

  formattedMessage = () => (
    <span>
      {beggining}
      <DocumentLink
        link={middle}
        onClick={action}
      />
      {end}
    </span>
  );

  return formattedMessage();
}

export default {
  FormatLink
};