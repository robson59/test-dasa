import React from 'react';
import PropTypes from 'prop-types';
import { Image, Linking } from 'react-native';
import {
  Container, Content, Card, CardItem, Body, H3, Text, Left, Thumbnail, Button, Icon,
} from 'native-base';
import { Loading, Error, Spacer } from '../UI';
import { errorMessages } from '../../constants/messages';

const UsersSingle = ({
  error, loading, user, reFetch,
}) => {
  if (error) {
    return <Error content={error} tryAgain={reFetch} />;
  }

  if (loading) {
    return <Loading content={loading} />;
  }

  if (Object.keys(user).length < 1) {
    return <Error content={errorMessages.users404} />;
  }

  return (
    <Container>
      <Content padder>

        <Spacer size={25} />

        <Card style={{ flex: 0 }}>

          <CardItem>
            <Left>
              <Thumbnail source={{ uri: user.avatar_url }} />
              <Body>
                <Text>{ user.name }</Text>
                <Text note>{ user.login }</Text>
              </Body>
            </Left>
          </CardItem>

          {user.bio ? (
            <CardItem>
              <Left>
                <Text note>{ user.bio }</Text>
              </Left>
            </CardItem>
          ) : null}

          <CardItem>
            {user.location ? (
              <Left>
                <Icon type="FontAwesome5" name="map-marked-alt" />
                <Text note>{user.location}</Text>
              </Left>
            ) : null}

            {user.company ? (
              <Left>
                <Icon type="FontAwesome5" name="building" />
                <Text note>{user.company}</Text>
              </Left>
            ) : null}
          </CardItem>

          <CardItem>
            <Left>
              <Text note>Followers: </Text>
              <Text note>{user.followers}</Text>
            </Left>

            <Left>
              <Text note>Following: </Text>
              <Text note>{user.following}</Text>
            </Left>
          </CardItem>

          {user.blog ? (
            <CardItem>
              <Left>
                <Button
                  onPress={() => {
                    Linking.openURL(user.blog).catch((err) => console.error("Couldn't load page", err));
                  }}
                  transparent
                  textStyle={{ color: '#87838B' }}
                >
                  <Icon type="FontAwesome5" name="globe" />
                  <Text>{ user.blog }</Text>
                </Button>
              </Left>
            </CardItem>
          ) : null}

        </Card>

        <Spacer size={20} />

      </Content>
    </Container>
  );
};

UsersSingle.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  user: PropTypes.shape({
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
    name: PropTypes.string,
    company: PropTypes.string,
    blog: PropTypes.string,
    location: PropTypes.string,
    email: PropTypes.string,
    hireable: PropTypes.string,
    bio: PropTypes.string,
    twitter_username: PropTypes.string,
    public_repos: PropTypes.number,
    public_gists: PropTypes.number,
    followers: PropTypes.number,
    following: PropTypes.number,
  }),
  reFetch: PropTypes.func,
};

UsersSingle.defaultProps = {
  error: null,
  loading: false,
  user: {},
  reFetch: null,
};

export default UsersSingle;
