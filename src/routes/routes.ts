import {
    Router
} from 'express';

import axios from 'axios';

import {
    SummonerController
} from '../services/summonerController';

const router = Router();

const getSummonerController = new SummonerController("RGAPI-626731c3-964b-4753-b2c4-5bf357cbea36", axios, "E8FB08E835538312544F4D907361BF2E");

router.get("/summoner", getSummonerController.info);
router.get("/name", getSummonerController.name);
router.get("/status", getSummonerController.status);
router.get("/steamId", getSummonerController.getStatics);
// router.get("/teste", getSummonerController.teste);

export default router;