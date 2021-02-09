import {
    Router
} from 'express';

import {
    SummonerController
} from '../services/summonerController';

const router = Router();

const getSummonerController = new SummonerController("RGAPI-7cba9f25-9876-454e-a74c-8d031faaffcd");

router.get("/summoner", getSummonerController.info)
router.get("/status", getSummonerController.status)
router.get("/matchs", getSummonerController.matchs)

export default router;