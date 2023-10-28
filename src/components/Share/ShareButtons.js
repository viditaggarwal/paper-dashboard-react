import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  RedditIcon,
} from 'react-share';

export default (props) => {
  console.log("props", props);
  const projectName = "Stocky";
  const title = `Unlock Wall Street-grade Insights with ${projectName}`;
  const description = `Get real-time insights & transparency with Stocky. Designed for retail investors. Join the waitlist!`;


  return (
    <ul className="social-share">
      <li>
        <FacebookShareButton
          url={props.url}
          quote={`${title}, ${description}`}
        >
          <FacebookIcon size={32} />
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton url={props.url} title={title} via={description}>
          <TwitterIcon size={32} />
        </TwitterShareButton>
      </li>
      <li>
        <LinkedinShareButton url={props.url} title={title} description={description}>
          <LinkedinIcon size={32} />
        </LinkedinShareButton>
      </li>
      <li>
        <TelegramShareButton url={props.url} title={title}>
          <TelegramIcon size={32} />
        </TelegramShareButton>
      </li>
      <li>
        <RedditShareButton url={props.url} title={title}>
          <RedditIcon size={32} />
        </RedditShareButton>
      </li>
    </ul>
  );
};
