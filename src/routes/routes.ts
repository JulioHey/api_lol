import {
    Router
} from 'express';

import * as dotenv from 'dotenv';

import axios from 'axios';

import achievments from '../static/achievmentsOrdered.json';

import {
    SummonerController
} from '../controllers/summoner_controller';

import {
    SteamController
} from '../controllers/steam_controller';


dotenv.config();

const RiotApiKey = process.env.RIOT_KEY ? process.env.RIOT_KEY : "";
const SteamApiKey = process.env.STEAM_KEY ? process.env.STEAM_KEY : "";

const router = Router();

const summonerController = new SummonerController(RiotApiKey, axios);
const steamController = new SteamController(axios, SteamApiKey, achievments);

router.get("/val/test", summonerController.valorantMatch);

router.get("/lol/info", summonerController.basicInfo);
router.get("/lol/authenticate", summonerController.authenticate);
router.get("/lol/match", summonerController.history);
router.get("/lol/basicHistory", summonerController.basicHistory);
router.get("/lol/status", summonerController.basicStatus);
router.get("/lol/mastery", summonerController.championsMastery);
router.get("/lol/champion-win-rate", summonerController.championWinRate);

router.get("/csgo/steamId", steamController.getStats);
router.get("/csgo/weapons", steamController.getWeaponStats);


export default router;