


## 1
把下面的表

| year | month | mount |
|:----:|:-----:|:-----:|
| 2017 |   1   | 1.10  |
| 2017 |   2   | 1.20  |
| 2017 |   3   | 1.30  |
| 2017 |   4   | 1.40  |
| 2018 |   1   | 2.10  |
| 2018 |   2   | 2.20  |
| 2018 |   3   | 2.30  |
| 2018 |   4   | 2.40  |

查成这样的结果

| year | m1   | m2   | m3   | m4   |
|------|------|------|------|------|
| 2017 | 1.10 | 1.20 | 1.30 | 1.40 |
| 2018 | 2.10 | 2.20 | 2.30 | 2.40 |

```sql
CREATE TABLE t1
(
    year  varchar(10),
    month varchar(10),
    mount decimal(8, 2)
);

INSERT INTO t1
VALUES ('2017', 1, 1.10);
INSERT INTO t1
VALUES ('2017', 2, 1.20);
INSERT INTO t1
VALUES ('2017', 3, 1.30);
INSERT INTO t1
VALUES ('2017', 4, 1.40);
INSERT INTO t1
VALUES ('2018', 1, 2.10);
INSERT INTO t1
VALUES ('2018', 2, 2.20);
INSERT INTO t1
VALUES ('2018', 3, 2.30);
INSERT INTO t1
VALUES ('2018', 4, 2.40);
```
```sql
select
	year,
	min(case when month='1' then mount else null end) as m1,
	min(case when month='2' then mount else null end) as m2,
	min(case when month='3' then mount else null end) as m3,
	min(case when month='4' then mount else null end) as m4
from t1
group by year;
```
这是经典的行转列题型，通过使用`case when`取出我们需要的列，再通过聚合函数去掉每一列中的`null`值，来达到题目的要求。
## 2
查询出每门课都大于 80 分的学生姓名。

| name | course | score |
|:----:|:------:|:-----:|
|  张三  |   语文   |  81   |
|  张三  |   数学   |  75   |
|  李四  |   语文   |  76   |
|  李四  |   数学   |  90   |
|  王五  |   语文   |  81   |
|  王五  |   数学   |  100  |
|  王五  |   英语   |  90   |

结果为：

| name |
|------|
| 王五   |

```sql
CREATE TABLE t2
(
    name   varchar(20),
    course varchar(20),
    score  int
);
INSERT INTO t2 VALUES ('张三', '语文', 81);
INSERT INTO t2 VALUES ('张三', '数学', 75);
INSERT INTO t2 VALUES ('李四', '语文', 76);
INSERT INTO t2 VALUES ('李四', '数学', 90);
INSERT INTO t2 VALUES ('王五', '语文', 81);
INSERT INTO t2 VALUES ('王五', '数学', 100);
INSERT INTO t2 VALUES ('王五', '英语', 90);
```
```sql
-- 方法1
SELECT name
FROM t2
GROUP BY name
HAVING MIN(score) > 80;
-- 方法2
SELECT DISTINCT name
FROM t2
WHERE name NOT IN (SELECT DISTINCT name FROM t2 WHERE score <= 80);
```
方法一是通过找到每个学生的分数的最小值，当最小值都比 80 分大，那么就是该学生的所有课程分数都比 80 大。

方法二是先找到有课程分数小于等于 80 分的学生，然后通过`NOT IN`来排除这些学生。
## 3
从考勤表中找出员工每天的上班，下班打卡的具体时间。

| id | name | number |        time         |
|:--:|:----:|:------:|:-------------------:|
| 1  |  张三  |  1001  | 2024-12-12 08:22:27 |
| 2  |  李四  |  1002  | 2024-12-12 08:08:52 |
| 3  |  张三  |  1001  | 2024-12-12 12:13:16 |
| 4  |  李四  |  1002  | 2024-12-12 18:09:22 |
| 5  |  王五  |  1003  | 2024-12-12 08:22:27 |
| 6  |  张三  |  1001  | 2024-12-12 18:31:14 |

其中`id`是主键，`name`为员工姓名，`number`为工号，`time`为打卡时间 返回的结果如下：

|     日期     | 姓名 |        上班时间         |        下班时间         |
|:----------:|:--:|:-------------------:|:-------------------:|
| 2019-11-09 | 张三 | 2019-11-09 08:22:27 | 2019-11-09 18:31:14 |
| 2019-11-09 | 李四 | 2019-11-09 08:08:52 | 2019-11-09 18:09:22 |
| 2019-11-09 | 王五 | 2019-11-09 08:22:27 | 2019-11-09 08:22:27 |

```sql
CREATE TABLE t3
(
    id     int,
    name   varchar(20),
    number int,
    time   varchar(50)
);
INSERT INTO t3 VALUES (1, '张三', 1001, '2019-11-09 08:22:27');
INSERT INTO t3 VALUES (2, '李四', 1002, '2019-11-09 08:08:52');
INSERT INTO t3 VALUES (3, '张三', 1001, '2019-11-09 12:13:16');
INSERT INTO t3 VALUES (4, '李四', 1002, '2019-11-09 18:09:22');
INSERT INTO t3 VALUES (5, '王五', 1003, '2019-11-09 08:22:27');
INSERT INTO t3 VALUES (6, '张三', 1001, '2019-11-09 18:31:14');
```
```sql
SELECT DATE_FORMAT(t.time, '%Y-%m-%d') AS '日期',
       t.name                          AS '姓名',
       MIN(t.time)                     AS '上班时间',
       MAX(t.time)                     AS '下班时间'
FROM t3 t
GROUP BY t.name;
```
根据题意我们只需要求出每个员工每天的上下班时间即可，而员工的上下班时间可以通过每天打卡的最小值(`MIN()`)和最大值(`MAX()`)来判定。
## 4
查找所有至少连续出现两次的数字。

| id | num |
|:--:|:---:|
| 1  |  1  |
| 2  |  1  |
| 3  |  1  |
| 4  |  2  |
| 5  |  1  |
| 6  |  2  |
| 7  |  2  |

结果：

| num | times |
|:---:|:-----:|
|  1  |   3   |
|  2  |   2   |

通过关联子查询和自连接来比较每一行的上下两行是否相等， 如果相等就表示连续的，如果不相等就不连续。

其中的`where`条件属于连续性判定中一种固定写法：(`a.ID=t.ID+1 OR a.ID=t.ID-1`) -- 判定上下两行是否相等。
```sql
CREATE TABLE t4
(
    id  int,
    num int
);
INSERT INTO t4 VALUES (1, 1);
INSERT INTO t4 VALUES (2, 1);
INSERT INTO t4 VALUES (3, 1);
INSERT INTO t4 VALUES (4, 2);
INSERT INTO t4 VALUES (5, 1);
INSERT INTO t4 VALUES (6, 2);
INSERT INTO t4 VALUES (7, 2);
```
```sql
SELECT t.num, COUNT(*) times
FROM t4 t
WHERE EXISTS(
              SELECT 1
              FROM t4 a
              WHERE a.num = t.num
                AND (a.id = t.id + 1 OR a.id = t.id - 1)
          )
GROUP BY t.num;
```
## 5
有一张成绩表，分别对应是学生 ID，课程 ID 和学生成绩。

| stu_id | cid | score |
|:------:|:---:|:-----:|
|   1    | 001 |  67   |
|   1    | 002 |  89   |
|   1    | 003 |  94   |
|   2    | 001 |  95   |
|   2    | 002 |  88   |
|   2    | 004 |  78   |
|   3    | 001 |  97   |
|   3    | 002 |  77   |

查询出'001'课程分数大于'002'课程分数的学生学号，预期结果为：

| stu_id |
|:------:|
|   2    |
|   3    |

```sql
CREATE TABLE t5
(
    stu_id int,
    cid   varchar(20),
    score int
);

INSERT INTO t5 VALUES (1, '001', 67);
INSERT INTO t5 VALUES (1, '002', 89);
INSERT INTO t5 VALUES (1, '003', 94);
INSERT INTO t5 VALUES (2, '001', 95);
INSERT INTO t5 VALUES (2, '002', 88);
INSERT INTO t5 VALUES (2, '004', 78);
INSERT INTO t5 VALUES (3, '001', 94);
INSERT INTO t5 VALUES (3, '002', 77);
INSERT INTO t5 VALUES (3, '003', 90);
```
```sql
SELECT a.stu_id
FROM (SELECT stu_id, Score
FROM t5
WHERE CID = '001') a,
     (SELECT stu_id, Score
     FROM t5
     WHERE CID = '002') b
WHERE a.stu_id = b.stu_id
  AND a.Score > b.Score;
```
根据题意，我们要分别先求出 001 课程和 002 课程的分数`Score`；然后通过学生 ID(`stu_id`)来进行关联，并且只需要 001 课程的分数(`a.score`)大于 002 课程的分数`score(b.score)`即可。

上述代码使用的是子查询关联来进行求解的。
