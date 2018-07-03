let Leaderboard = artifacts.require('./Leaderboard.sol');

contract('Leaderboard', function (accounts) {
    it("should assert true", async function () {
        await Leaderboard.deployed();
        assert.isTrue(true);
    });

    it("should return empty leaderboard after deploy", async function () {
        let instance = await Leaderboard.new();

        let standings = await instance.getLeaderboard.call();
        assert.equal(
            0,
            standings.length,
        );
    });

    it("should add players on the scoreboard", async function () {
        let l = await Leaderboard.new();

        let player1Scored = await l.play({ from: accounts[1] });
        // Play 1 was successful
        assert.equal(
            '0x01',
            player1Scored.receipt.status,
        );
        // Find player in leaderboard
        let standings = await l.getLeaderboard.call();
        assert.equal(
            1,
            standings.length,
        );
        assert.equal(
            accounts[1],
            standings[0],
        );

        // Play 2 was successful
        let player2Scored = await l.play({ from: accounts[2] });
        assert.equal(
            '0x01',
            player2Scored.receipt.status,
        );
        // Find player in leaderboard
        standings = await l.getLeaderboard.call();
        assert.equal(
            2,
            standings.length,
        );
        assert.equal(
            accounts[2],
            standings[1],
        );
    });

    it("should be able to clear scoreboard", async function () {
        let l = await Leaderboard.new({ from: accounts[0] });

        // Add one player
        await l.play({ from: accounts[1] });
        let standings = await l.getLeaderboard.call();
        assert.equal(
            1,
            standings.length,
        );

        // Clear leaderboard
        await l.clearStandings({ from: accounts[0] });
        assert.equal(
            0,
            (await l.getLeaderboard.call()).length,
        );

        // Should not be able to clear leaderboard if not the owner
        let clearedByNonOwner;
        try {
            await l.clearStandings({ from: accounts[1] });
            clearedByNonOwner = true;
        } catch (e) {
            clearedByNonOwner = false;
        }
        assert.isTrue(!clearedByNonOwner);
    });
});
