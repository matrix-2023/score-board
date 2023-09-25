// React library and hooks API
import { createRef, useEffect } from "react";

// Styled-component library for designing components
import styled from "styled-components";

// Utils and Global Constants
import { GreyImgUrl, DeviceWidth } from "utils/constants";
import { StreamersTypes } from "utils/globalTypes";

// Custom hook to fetch device type
import useSystemInfo from "hooks/useSystemInfo";

// Animation functionality and css
import AnimationSlide from "components/animation/AnimationSlide";
import "assets/css/numberanimation.css";
import { AnimateNumber } from "utils/animateNum";

// -------------------- Custom Style using styled-component --------------------
const ListGroup = styled.ul`
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const List = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 15px 20px;

  &:last-child {
    border-bottom: 1px solid transparent;
  }

  @media only screen and ${DeviceWidth.m} {
    padding: 8px 15px;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.listHoverBg};
    color: ${(props) => props.theme.colors.white};
    &:first-child {
      border-radius: 12px 12px 0 0;
    }
    &:last-child {
      border-radius: 0 0 12px 12px;
    }
  }
`;

const StreamerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;

  @media only screen and ${DeviceWidth.m} {
    font-size: 14px;
    font-weight: 500;
  }
  @media only screen and ${DeviceWidth.xs} {
    font-size: 12px;
    font-weight: 400;
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.badgeBg};

  &#u-1 {
    background-color: ${(props) => props.theme.colors.top1BadgeBg};
  }
  &#u-2 {
    background-color: ${(props) => props.theme.colors.top2BadgeBg};
  }
  &#u-3 {
    background-color: ${(props) => props.theme.colors.top3BadgeBg};
  }

  @media only screen and ${DeviceWidth.m} {
    height: 16px;
    width: 16px;
    font-size: 8px;
    font-weight: 500;
  }
  @media only screen and ${DeviceWidth.xs} {
    height: 12px;
    width: 12px;
    font-size: 6px;
    font-weight: 400;
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin: 0 10px;
  border: 3px solid ${(props) => props.theme.colors.white};
  border-radius: 50%;
  cursor: pointer;

  @media only screen and ${DeviceWidth.m} {
    height: 24px;
    width: 24px;
    margin: 0 8px;
    border-width: 1px;
  }
  @media only screen and ${DeviceWidth.xs} {
    height: 18px;
    width: 18px;
    margin: 0 4px;
    border-width: 1px;
  }
`;

const ScoreDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 18px;
  font-weight: 600;

  @media only screen and ${DeviceWidth.m} {
    font-size: 14px;
    font-weight: 500;
  }
  @media only screen and ${DeviceWidth.xs} {
    font-size: 12px;
    font-weight: 400;
  }
`;

const ScoreText = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.smallText};
  font-size: 14px;
  font-family: circular, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
`;

const SmallText = styled.small`
  margin-left: 4px;
  color: ${(props) => props.theme.colors.smallText};
  font-size: 12px;

  @media only screen and ${DeviceWidth.m} {
    display: none;
  }
`;

const DisplayText = styled.div`
  font-family: circular, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: 16px;
`;

// -------------------- Custom Style using styled-component --------------------

// Declaring type of props
interface PlayersListProps {
  data: StreamersTypes[];
}

// JSX function starts from here
const PlayersList = (props: PlayersListProps): JSX.Element => {
  // Destructuring of props
  const { data: streamersList } = props;

  // Destructuring required variable from object return by custom hook.
  let { desktopView } = useSystemInfo();

  useEffect(() => {
    if (streamersList?.length > 0) {
      new (AnimateNumber as any)(".scoreValue", {
        direction: "rtl",
        delay: 200,
        digits: 7,
      });
    }
  }, [streamersList]);

  return (
    <ListGroup>
      <AnimationSlide>
        {streamersList
          ?.sort((a, b) =>
            a.score !== b.score ? b.score - a.score : a.score - b.score
          )
          .map((streamer, index) => (
            <List
              key={streamer?.userID || index}
              id={streamer?.userID}
              ref={createRef()}
            >
              <StreamerInfo>
                <Badge id={`u-${index + 1}`}>{index + 1}</Badge>
                <Img src={streamer.picture || GreyImgUrl} />
                <DisplayText>
                  {streamer?.displayName?.length > 23 && !desktopView
                    ? `${streamer?.displayName?.slice(0, 24)}...`
                    : streamer?.displayName}
                </DisplayText>
              </StreamerInfo>
              <ScoreDiv>
                {streamer?.updated ? (
                  <ScoreText
                    className="scoreValue"
                    data-value={streamer?.score}
                  />
                ) : (
                  <ScoreText>{streamer?.score}</ScoreText>
                )}
                <SmallText>Points</SmallText>
              </ScoreDiv>
            </List>
          ))}
      </AnimationSlide>
    </ListGroup>
  );
};

export default PlayersList;
