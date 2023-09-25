// React library and hooks API
import { useEffect, useState } from "react";

// Styled-component library for designing components
import styled from "styled-components";

// JSON data
import streamersData from "assets/data/streamers.json";

// Utils and Global Constants
import { StreamersTypes } from "utils/globalTypes";
import { DeviceWidth, isEmpty } from "utils/constants";

// Custom component to list the steamers
import PlayersList from "components/playerslist/PlayersList";

// -------------------- Custom Style using styled-component --------------------
const DashboardContainer = styled.div`
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.listBg};
  max-width: 80%;
  margin: 0 auto;

  @media only screen and ${DeviceWidth.m} {
    max-width: 100%;
  }
`;
// -------------------- Custom Style using styled-component --------------------

// JSX function starts from here
const ScoresDashboard = () => {
  // Constants
  const updatedList: StreamersTypes[] = []; // to push the randomly updated score streamer with other streamers

  // React state to store streamers data
  const [streamersList, setStreamersList] = useState<StreamersTypes[]>([]);

  // To set streamersList state once JSON file is imported with data
  useEffect(() => {
    if (!isEmpty(streamersData)) setStreamersList(streamersData);
  }, [streamersData]);

  // To set streamersList state after each sec with randomly updated score
  useEffect(() => {
    let scoreUpdateTimer: any;

    // To update streamersList data of only randomly player whose score is updated and rest of all as it is.
    // Will update score of 1 player at a time and every sec the same.
    if (streamersList.length > 0) {
      scoreUpdateTimer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * streamersList.length); // to generate random index as per JSON data length

        // Find the random index object from list of players and update score only of that.
        // And push into another array including not updated players data.
        streamersList?.map((item, index) => {
          item.updated = false;
          if (index + 1 === randomIndex) {
            item.score = item.score + index + randomIndex * 358;
            console.log(item.score, "score");

            item.updated = true;
          }
          updatedList.push(item);
          return item;
        });

        // Set state with new array
        setStreamersList(updatedList);
      }, 2000);
    }
    // this will clear Timeout when component unmount like in willComponentUnmount
    return () => {
      clearTimeout(scoreUpdateTimer);
    };
  }, [streamersList]);

  return (
    <DashboardContainer>
      <PlayersList data={streamersList} />
    </DashboardContainer>
  );
};

export default ScoresDashboard;
