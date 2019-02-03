# receipts-react

This is a port from a program originally [written in C].  Its intent is to track my farm receipts, and I expand its functionality as I have time.

It uses the following:

- [React]
- [Apollo Client]
- [Flow]
- [Immutable] well, kind of

## Start the servers

```
npx webpack-dev-server --open
node server/app
```

## Flow

Run server to check static types:

```
npx flow
```

Add a library definition to `./flow-typed/npm`:

<pre>
npx <a href="https://github.com/flow-typed/flow-typed">flow-typed</a> install react-apollo
</pre>

## Screenshots

Check out the pro design.

![ScreenShot](https://raw.github.com/btoll/i/master/receipts-react/receipts-react.png)

## TODO

- Add Redux
- Better form validation for AddReceipt
- Build Query page

## License

[GPLv3](COPYING)

## Author

Benjamin Toll

[written in C]: https://github.com/btoll/receipts
[React]: https://reactjs.org/
[Apollo Client]: https://www.apollographql.com/
[Flow]: https://flow.org/
[Immutable]: https://facebook.github.io/immutable-js/

