# authql-client - Authentication over GraphQL

This is the client side of a simple mechanism for doing email+password
authentication over [GraphQL](http://graphql.org/) in
[React](https://facebook.github.io/react/) applications using
[React Apollo](http://dev.apollodata.com/react/). The
server side is [authql-server](https://github.com/bryanstearns/authql-server),
and adds authentication support to
[Elixir](https://elixir-lang.org/)/[Phoenix](http://phoenixframework.org/)
applications that use [Absinthe](http://absinthe-graphql.org/).

I wrote it because I've created several applications that I want to deploy
publicly, but don't want to grant free-for-all access to my data, nor spend a
lot of time implementing authentication in each one :-)

[authql-example-client](https://github.com/bryanstearns/authql-example-client)
and [authql-example-server](https://github.com/bryanstearns/authql-example-server)
show how these libraries are used.

So far, I haven't published this on npm, or written more documentation than
this README; if there's interest, I will. Certainly, if you see anything wrong
with what I've done here, please file an issue; pull requests gladly accepted,
too.
