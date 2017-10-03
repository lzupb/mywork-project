package service;

import com.pengbo.project.admin.jpa.entity.QTfaAlarmAct;
import com.pengbo.project.admin.jpa.entity.QTfaAlertLocal;
import com.pengbo.project.admin.jpa.entity.TfaAlarmAct;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import config.BaseServiceTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by pengbo01 on 2017/9/24.
 */
public class JpaQueryFactoryTest extends BaseServiceTest {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    private QTfaAlarmAct tfaAlarmAct = QTfaAlarmAct.tfaAlarmAct;

    private QTfaAlertLocal tfaAlertLocal = QTfaAlertLocal.tfaAlertLocal;

    @Test
    public void testQuery() {

        {
            List<TfaAlarmAct> list = jpaQueryFactory.select(
                    tfaAlarmAct)
                    .from(tfaAlarmAct)
                    .offset(1).limit(10)
                    .fetch();
            System.out.println(list.size());
        }

        {
            List<TfaAlarmAct> list = jpaQueryFactory.select(
                    tfaAlarmAct)
                    .from(tfaAlarmAct)
                    .leftJoin(tfaAlertLocal).on(tfaAlertLocal.tfaAlarmId.longValue().eq(tfaAlarmAct.id.longValue()))
                    .offset(1).limit(10)
                    .fetch();
            System.out.println(list.size());
        }

    }
}
