import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Linking } from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Body,
  Text,
  Button,
  Thumbnail,
  Left,
  Icon,
  Item,
  Input,
  Header,
} from 'native-base';
import { Error, Spacer } from '../UI';
import { errorMessages } from '../../constants/messages';

const ReposList = ({
  error, loading, listFlat, reFetch, meta, search, term,
}) => {
  if (error) {
    return <Error content={error} tryAgain={reFetch} />;
  }

  return (
    <Container style={{ paddingHorizontal: 10 }}>
      <Header style={{ padding: 0 }} transparent>
        <Body>
          <Item>
            <Input
              onChangeText={(text) => search(text)}
              placeholder="Search repos in github"
              style={{
                fontSize: 12, height: 40, paddingLeft: 20,
              }}
            />
            <Icon style={{ fontSize: 18, marginRight: 10 }} active type="FontAwesome5" name="search" />
          </Item>
        </Body>
      </Header>
      {
        listFlat.length < 1 || term === null
          ? (<Error content={errorMessages.reposSearch} />)
          : (
            <FlatList
              data={listFlat}
              onRefresh={() => reFetch({ forceSync: true })}
              refreshing={loading}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text>{ item.name }</Text>
                        <Text note>{ item.full_name }</Text>
                      </Body>
                    </Left>
                  </CardItem>

                  {item.description ? (
                    <CardItem>
                      <Left>
                        <Text note>{ item.description }</Text>
                      </Left>
                    </CardItem>
                  ) : null}

                  <CardItem>
                    <Left>
                      <Thumbnail source={{ uri: item.owner.avatar_url }} />
                      <Body>
                        <Text>Owner</Text>
                        <Text note>{ item.owner.login }</Text>
                      </Body>
                    </Left>
                  </CardItem>

                  <CardItem>
                    {item.stargazers_count ? (
                      <Left>
                        <Icon type="FontAwesome5" name="star" />
                        <Text note>{ item.stargazers_count }</Text>
                      </Left>
                    ) : null}

                    {item.watchers_count ? (
                      <Left>
                        <Icon type="FontAwesome5" name="eye" />
                        <Text note>{ item.watchers_count }</Text>
                      </Left>
                    ) : null}
                  </CardItem>

                  <CardItem>
                    {item.open_issues_count ? (
                      <Left>
                        <Icon type="FontAwesome5" name="bug" />
                        <Text note>{ item.open_issues_count }</Text>
                      </Left>
                    ) : null}

                    {item.forks_count ? (
                      <Left>
                        <Icon type="FontAwesome5" name="code-branch" />
                        <Text note>{ item.forks_count }</Text>
                      </Left>
                    ) : null}
                  </CardItem>

                  <CardItem>
                    <Left>
                      <Button
                        onPress={() => {
                          Linking.openURL(item.html_url)
                            .catch((err) => console.error("Couldn't load page", err));
                        }}
                        transparent
                      >
                        <Icon active type="FontAwesome" name="external-link" />
                        <Text>Open in Browser</Text>
                      </Button>
                    </Left>
                  </CardItem>
                </Card>
              )}
              keyExtractor={(item) => `${item.id}-${item.login}`}
              ListFooterComponent={(meta && meta.page && meta.total > listFlat.length)
                ? () => (
                  <React.Fragment>
                    <Spacer size={20} />
                    <Button
                      block
                      bordered
                      onPress={() => reFetch({ incrementPage: true })}
                    >
                      <Text>Load More</Text>
                    </Button>
                    <Spacer size={10} />
                  </React.Fragment>
                ) : null}
            />
          )
      }
    </Container>
  );
};

ReposList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  listFlat: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      node_id: PropTypes.string,
      name: PropTypes.string,
      full_name: PropTypes.string,
      html_url: PropTypes.string,
      description: PropTypes.string,
      stargazers_count: PropTypes.number,
      watchers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      language: PropTypes.string,
      owner: {
        login: PropTypes.string,
        id: PropTypes.number,
        node_id: PropTypes.string,
        avatar_url: PropTypes.string,
        gravatar_id: PropTypes.string,
        url: PropTypes.string,
        html_url: PropTypes.string,
        followers_url: PropTypes.string,
        following_url: PropTypes.string,
        gists_url: PropTypes.string,
        starred_url: PropTypes.string,
        subscriptions_url: PropTypes.string,
        organizations_url: PropTypes.string,
        repos_url: PropTypes.string,
        events_url: PropTypes.string,
        received_events_url: PropTypes.string,
        type: PropTypes.string,
        site_admin: PropTypes.bool,
        score: PropTypes.number,
      },
    }),
  ),
  reFetch: PropTypes.func,
  search: PropTypes.func,
  meta: PropTypes.shape({
    page: PropTypes.number,
    total: PropTypes.number,
  }),
  term: PropTypes.string,
};

ReposList.defaultProps = {
  listFlat: [],
  error: null,
  reFetch: null,
  search: null,
  meta: { page: null, total: null },
  term: null,
  loading: false,
};

export default ReposList;
